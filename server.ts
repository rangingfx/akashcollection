import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up standard express body parsers
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ==========================================
// POSTEX COURIER INTEGRATION PROXY ENDPOINTS
// ==========================================

// 1. PostEx Configuration check status
app.get("/api/postex/config", (req, res) => {
  const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
  let maskedToken = "Not Configured";
  if (token) {
    maskedToken = token.substring(0, Math.min(4, token.length)) + "••••••••" + token.substring(Math.max(0, token.length - 4));
  }
  res.json({
    configured: !!token,
    token: maskedToken
  });
});

// 2. Operational Cities list query
app.get("/api/postex/cities", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    if (!token) {
      // High-fidelity fallback list of Pakistani operational cities when token is not yet active
      return res.json({
        statusCode: "200",
        statusMessage: "SUCCESSFULLY OPERATED (DEMO MODE)",
        dist: [
          { operationalCityName: "Lahore", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Islamabad", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Karachi", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Rawalpindi", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Faisalabad", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Multan", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Peshawar", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Gujranwala", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Sialkot", countryName: "Pakistan", isPickupCity: true, isDeliveryCity: true },
          { operationalCityName: "Quetta", countryName: "Pakistan", isPickupCity: false, isDeliveryCity: true },
          { operationalCityName: "Hyderabad", countryName: "Pakistan", isPickupCity: false, isDeliveryCity: true },
          { operationalCityName: "Sargodha", countryName: "Pakistan", isPickupCity: false, isDeliveryCity: true },
          { operationalCityName: "Bahawalpur", countryName: "Pakistan", isPickupCity: false, isDeliveryCity: true }
        ]
      });
    }

    const type = req.query.operationalCityType || "";
    const url = `https://api.postex.pk/services/integration/api/order/v2/get-operational-city${type ? `?operationalCityType=${type}` : ""}`;
    
    console.log(`Forwarding query to PostEx operational cities API: ${url}`);
    const response = await fetch(url, {
      headers: { token: token }
    });
    
    if (!response.ok) {
      throw new Error(`PostEx operational cities HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error fetching PostEx operational cities:", err);
    res.status(500).json({ error: "Failed to fetch PostEx cities", details: err.message });
  }
});

// 3. Merchant registered pickup warehouse addresses lookup
app.get("/api/postex/merchant-address", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    if (!token) {
      // High-fidelity fallback registered warehouse list in demo mode
      return res.json({
        statusCode: "200",
        statusMessage: "SUCCESSFULLY OPERATED (DEMO MODE)",
        dist: [
          {
            phone1: "+923000441793",
            phone2: "+923214567890",
            contactPersonName: "Babar Razzaq",
            cityName: "Lahore",
            address: "Akash Collection Wholesale, Shop #4, Shalimar Link Road, Lahore",
            addressCode: "LHR-WH-001"
          },
          {
            phone1: "+923001234567",
            phone2: "",
            contactPersonName: "Akash Ghafoor",
            cityName: "Faisalabad",
            address: "Akash Warehouse, Montgomery Bazar, Faisalabad",
            addressCode: "FSD-WH-002"
          }
        ]
      });
    }

    const cityName = req.query.cityName || "";
    const url = `https://api.postex.pk/services/integration/api/order/v1/get-merchant-address${cityName ? `?cityName=${cityName}` : ""}`;
    
    console.log(`Forwarding query to PostEx merchant address API: ${url}`);
    const response = await fetch(url, {
      headers: { token: token }
    });

    if (!response.ok) {
      throw new Error(`PostEx merchant address HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error fetching PostEx address details:", err);
    res.status(500).json({ error: "Failed to fetch PostEx pickup addresses", details: err.message });
  }
});

// 4. Create new Order booking in PostEx system
app.post("/api/postex/create-order", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    const orderData = req.body;

    if (!orderData.cityName || !orderData.customerName || !orderData.customerPhone) {
      return res.status(400).json({ error: "cityName, customerName, and customerPhone are required fields." });
    }

    // Clean phone number format for PostEx specifications (Must be standard Pakistani format: 03xxxxxxxxx)
    let phone = orderData.customerPhone.trim();
    if (phone.startsWith("+92")) {
      phone = "0" + phone.substring(3);
    } else if (phone.startsWith("92")) {
      phone = "0" + phone.substring(2);
    }
    phone = phone.replace(/\D/g, "");
    if (phone.length === 10 && !phone.startsWith("0")) {
      phone = "0" + phone;
    }

    // Ensure physical deliveryAddress is provided or falls back safely
    const deliveryAddress = orderData.deliveryAddress || orderData.cityName;

    const payload = {
      cityName: orderData.cityName,
      customerName: orderData.customerName,
      customerPhone: phone,
      deliveryAddress: deliveryAddress,
      invoiceDivision: Number(orderData.invoiceDivision) || 1,
      invoicePayment: Number(orderData.invoicePayment) || 0,
      items: Number(orderData.items) || 1,
      orderDetail: orderData.orderDetail || "Clothing purchase from Akash Collection",
      orderRefNumber: orderData.orderRefNumber || `AK-${Math.floor(10000 + Math.random() * 90000)}`,
      orderType: orderData.orderType || "Normal",
      transactionNotes: orderData.transactionNotes || "Processed from merchant back-office system",
      pickupAddressCode: orderData.pickupAddressCode || "",
      storeAddressCode: orderData.storeAddressCode || ""
    };

    if (!token) {
      // Mock successful order creation under demo mode
      const mockTracking = `PE-${Math.floor(10000000 + Math.random() * 90000000)}`;
      console.log(`[DEMO] Simulating PostEx booking with tracking ID: ${mockTracking}`);
      return res.json({
        statusCode: "200",
        statusMessage: "ORDER HAS BEEN CREATED (DEMO MODE)",
        dist: {
          trackingNumber: mockTracking,
          orderStatus: "UnBooked",
          orderDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      });
    }

    const url = "https://api.postex.pk/services/integration/api/order/v3/create-order";
    console.log("Forwarding order booking to PostEx API:", JSON.stringify(payload));
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error creating order booking on PostEx:", err);
    res.status(500).json({ error: "Failed to book PostEx courier shipment", details: err.message });
  }
});

// 5. Cancel active booked shipment in PostEx system
app.put("/api/postex/cancel-order", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    const { trackingNumber } = req.body;

    if (!trackingNumber) {
      return res.status(400).json({ error: "trackingNumber parameter is required." });
    }

    if (!token) {
      console.log(`[DEMO] Simulating cancel operation for PostEx tracking ID: ${trackingNumber}`);
      return res.json({
        statusCode: "200",
        statusMessage: "Successfully Cancelled (DEMO MODE)"
      });
    }

    const url = "https://api.postex.pk/services/integration/api/order/v1/cancel-order";
    console.log(`Forwarding cancellation query to PostEx API for tracking number: ${trackingNumber}`);
    
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify({ trackingNumber })
    });

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error cancelling booked courier on PostEx:", err);
    res.status(500).json({ error: "Failed to cancel PostEx shipment", details: err.message });
  }
});

// 6. Live Shipment order tracking lookup
app.get("/api/postex/track/:trackingNumber", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    const { trackingNumber } = req.params;

    if (!trackingNumber) {
      return res.status(400).json({ error: "Tracking number parameter is required" });
    }

    if (!token) {
      // Highly descriptive fallback tracking history logic
      const isDelivered = trackingNumber.endsWith("2") || trackingNumber.endsWith("4") || trackingNumber.includes("DELIV");
      const isOuf = trackingNumber.endsWith("5") || trackingNumber.endsWith("7") || trackingNumber.includes("OUT");
      
      const status = isDelivered ? "Delivered" : isOuf ? "Out For Delivery" : "Booked";
      const statusCode = isDelivered ? "0005" : isOuf ? "0004" : "0002";
      
      const history = [
        { transactionStatusMessage: "At Merchant's Warehouse", transactionStatusMessageCode: "0001" },
        { transactionStatusMessage: "At PostEx Warehouse", transactionStatusMessageCode: "0003" }
      ];
      if (isOuf || isDelivered) {
        history.push({ transactionStatusMessage: "Package on Route / Out For Delivery", transactionStatusMessageCode: "0004" });
      }
      if (isDelivered) {
        history.push({ transactionStatusMessage: "Delivered", transactionStatusMessageCode: "0005" });
      }

      return res.json({
        statusCode: "200",
        statusMessage: "SUCCESSFULLY OPERATED (DEMO MODE)",
        dist: {
          customerName: "Saira Bibi",
          customerPhone: "03009876543",
          deliveryAddress: "House A-12, Street 3, Garden Town, Lahore",
          invoicePayment: 3450,
          trackingNumber: trackingNumber,
          transactionStatus: status,
          orderRefNumber: `AK-${trackingNumber.replace(/\D/g, "") || '8192'}`,
          transactionStatusHistory: history
        }
      });
    }

    const url = `https://api.postex.pk/services/integration/api/order/v1/track-order/${trackingNumber}`;
    console.log(`Forwarding tracking query to PostEx API: ${url}`);
    
    const response = await fetch(url, {
      headers: { token: token }
    });

    if (!response.ok) {
      throw new Error(`PostEx tracking HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error tracking order shipment with PostEx:", err);
    res.status(500).json({ error: "Failed to track PostEx shipment", details: err.message });
  }
});

// 7. General search of placed/active/completed orders
app.get("/api/postex/orders", async (req, res) => {
  try {
    const token = process.env.POSTEX_API_TOKEN ? process.env.POSTEX_API_TOKEN.trim() : "";
    const orderStatusID = req.query.orderStatusID || "0";
    const fromDate = req.query.fromDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = req.query.toDate || new Date().toISOString().split('T')[0];

    if (!token) {
      // Dynamic list mock based on filters
      return res.json({
        statusCode: "200",
        statusMessage: "SUCCESSFULLY OPERATED (DEMO MODE)",
        dist: [
          {
            customerName: "Amina Khan",
            customerPhone: "03001234567",
            deliveryAddress: "House 45, Street 2, Sector F-10, Islamabad",
            invoicePayment: 4800,
            trackingNumber: "PE-87234901",
            transactionDate: "2026-06-28",
            transactionStatus: "Out For Delivery",
            orderRefNumber: "AK-71932"
          },
          {
            customerName: "Zahid Ahmed",
            customerPhone: "03219876543",
            deliveryAddress: "DHA Phase 5, Block C, House 12, Lahore",
            invoicePayment: 12500,
            trackingNumber: "PE-56123498",
            transactionDate: "2026-06-29",
            transactionStatus: "Booked",
            orderRefNumber: "AK-98432"
          },
          {
            customerName: "Ayesha Bibi",
            customerPhone: "03334567123",
            deliveryAddress: "Gulshan-e-Iqbal, Block 13-D, Karachi",
            invoicePayment: 6200,
            trackingNumber: "PE-29837452",
            transactionDate: "2026-06-27",
            transactionStatus: "Delivered",
            orderRefNumber: "AK-10294"
          }
        ]
      });
    }

    const isUnbookedOnly = orderStatusID === "1" || orderStatusID === "Unbooked";
    const baseUrl = isUnbookedOnly 
      ? "https://api.postex.pk/services/integration/api/order/v2/get-unbooked-orders"
      : "https://api.postex.pk/services/integration/api/order/v1/get-all-order";

    const params = new URLSearchParams();
    if (isUnbookedOnly) {
      params.append("startDate", fromDate.toString());
      params.append("endDate", toDate.toString());
    } else {
      params.append("orderStatusID", orderStatusID.toString());
      params.append("fromDate", fromDate.toString());
      params.append("toDate", toDate.toString());
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log(`Forwarding order list query to PostEx API: ${url}`);
    
    const response = await fetch(url, {
      headers: { token: token }
    });

    if (!response.ok) {
      throw new Error(`PostEx orders query HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("Error querying list of orders from PostEx:", err);
    res.status(500).json({ error: "Failed to query PostEx orders list", details: err.message });
  }
});

// API test-email diagnostic endpoint
app.post("/api/test-email", async (req, res) => {
  try {
    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : "";
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim().replace(/\s/g, "") : "";
    const adminEmail = (process.env.ADMIN_EMAIL || smtpUser || "akashcollection.pk@gmail.com").trim();

    if (!smtpUser || !smtpPass) {
      return res.status(400).json({
        success: false,
        message: "SMTP user/password is missing from .env details. Please configure SMTP_USER and SMTP_PASS variables to enable email notifications.",
        diagnostics: { smtpHost, smtpPort, smtpUserExists: !!smtpUser, smtpPassExists: !!smtpPass }
      });
    }

    console.log(`Setting up test SMTP server connection to ${smtpHost}:${smtpPort}...`);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000 // 10s connection timeout
    });

    // Verify SMTP connection
    await transporter.verify();

    // Try sending a lovely diagnostic email
    console.log(`Sending diagnostic mail verification to standard administrator account: ${adminEmail}`);
    const info = await transporter.sendMail({
      from: `"Akash Collection SMTP Diagnostics" <${smtpUser}>`,
      to: adminEmail,
      subject: "🚀 Gmail/SMTP Mail Server Verification Successful!",
      text: `Hello Admin,\n\nWe are pleased to report that your direct Gmail SMTP Connection test was fully successful!\n\n` +
            `Environment details:\n- Host: ${smtpHost}\n- Port: ${smtpPort}\n- User: ${smtpUser}\n- Target Admin Inbox: ${adminEmail}\n\n` +
            `Timestamp: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); background-color: #ffffff;">
          <div style="background-color: #16a34a; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">Connection Verified</h1>
            <p style="margin: 6px 0 0 0; color: #dcfce7; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">SMTP Mail Server Diagnostic Tool</p>
          </div>
          <div style="padding: 24px; color: #44403c; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 15px;">Hello!</p>
            <p style="font-size: 14px;">This diagnostic message confirms that your direct <strong>Gmail/SMTP server configurations</strong> are fully authorized and operational inside the <strong>Akash Collection Wholesale</strong> back-office systems.</p>
            
            <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; padding: 18px; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; margin: 20px 0; color: #57534e;">
              <strong style="color: #1c1917; display: block; margin-bottom: 8px; font-size: 13px; font-family: sans-serif;">🔒 Diagnostic Details:</strong>
              • SMTP Connection Security: Verified/Active<br>
              • Incoming SMTP Host: ${smtpHost}<br>
              • Incoming SMTP Port: ${smtpPort}<br>
              • Registered SMTP User: ${smtpUser}<br>
              • Designated Admin Inbox: ${adminEmail}<br>
              • Verified Date/Time: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}
            </div>
            
            <p style="font-size: 13px; color: #78716c; margin-bottom: 0;">Order invoice summaries, direct bank transfer snapshots, and tracking updates will now be delivered smoothly to your verified mailbox.</p>
          </div>
          <div style="background-color: #fafaf9; border-top: 1px solid #e7e5e4; padding: 15px 24px; text-align: center; font-size: 11px; color: #78716c; font-family: monospace;">
            Akash Collection Wholesale Pakistan &bull; Powered by RanginGfx.com
          </div>
        </div>
      `
    });

    return res.json({
      success: true,
      message: "Direct SMTP Server Diagnostic is 100% Successful!",
      recipient: adminEmail,
      info: {
        messageId: info.messageId,
        envelope: info.envelope,
        accepted: info.accepted
      }
    });

  } catch (err: any) {
    console.error("SMTP Direct Diagnostic Failure:", err);
    
    // Provide super helpful diagnostic explanations for common SMTP authorization errors
    let explanation = err.message || "Unknown mail server connection error";
    let recommendations = "Please verify your server SMTP credentials under Workspace settings.";
    
    const lowerMsg = (err.message || "").toLowerCase();
    const lowerCode = (err.code || "").toLowerCase();
    
    if (lowerMsg.includes("invalid login") || err.code === "EAUTH" || lowerMsg.includes("username and password not accepted")) {
      explanation = "Authentication credentials rejected by Gmail SMTP servers.";
      recommendations = "Gmail requires an App Password! Since May 2022, regular Google account passwords do not work. To solve this, log into Gmail Account settings -> Security -> Turn on '2-Step Verification' -> search for 'App Passwords', choose 'Other' and copy the 16-character code into your SMTP_PASS variable.";
    } else if (err.code === "ESOCKET" || err.code === "ETIMEDOUT") {
      explanation = "Network connection timeout or unreachable host port.";
      recommendations = "Verify your SMTP_HOST and SMTP_PORT are correct. Ensure that you have specified 'smtp.gmail.com' for Gmail or your custom mail-server configurations.";
    }

    return res.status(500).json({
      success: false,
      message: explanation,
      errorDetails: err.message,
      errorCode: err.code || "N/A",
      recommendations: recommendations,
      diagnostics: {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || "587"
      }
    });
  }
});

// API SMTP status configuration helper
app.get("/api/smtp-status", (req, res) => {
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = (process.env.SMTP_PORT || "587").trim();
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : "";
  const adminEmail = (process.env.ADMIN_EMAIL || user || "akashcollection.pk@gmail.com").trim();

  // Safe masking for user secrets
  let maskedUser = "Not Mocked / Not Configured";
  if (user) {
    const parts = user.split("@");
    if (parts.length === 2) {
      const name = parts[0];
      const domain = parts[1];
      const obscuredName = name.length > 2 
        ? name.substring(0, 2) + "•••••" + name.substring(name.length - 1)
        : "•••••";
      maskedUser = `${obscuredName}@${domain}`;
    } else {
      maskedUser = user.substring(0, Math.min(3, user.length)) + "•••••";
    }
  }

  return res.json({
    configured: !!(user && process.env.SMTP_PASS),
    host,
    port,
    user: maskedUser,
    adminEmail,
    hasSmtpUser: !!user,
    hasSmtpPass: !!process.env.SMTP_PASS
  });
});

// Helper function to build beautiful HTML for the order email
function generateOrderHtml(order: any): string {
  const { id, date, customer, items, subtotal, shippingFee, total } = order;
  const paymentMethodText = customer.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery (COD)';

  let itemsHtml = '';
  for (const item of items) {
    const originalPriceText = item.product.originalPrice 
      ? `<span style="text-decoration: line-through; color: #a8a29e; font-size: 11px; margin-right: 4px;">Rs. ${item.product.originalPrice}</span>` 
      : '';
    itemsHtml += `
      <tr style="border-bottom: 1px solid #e7e5e4;">
        <td style="padding: 12px 8px; vertical-align: top;">
          <img src="${item.product.image}" alt="${item.product.title}" style="width: 50px; height: auto; border: 1px solid #e7e5e4; border-radius: 4px;" referrerPolicy="no-referrer" />
        </td>
        <td style="padding: 12px 8px; vertical-align: top;">
          <div style="font-weight: bold; color: #1c1917; font-size: 14px;">${item.product.title}</div>
          <div style="color: #78716c; font-size: 12px; margin-top: 2px;">
            Fabric: ${item.product.fabric} &bull; Size: <strong style="color: #1c1917;">${item.selectedSize}</strong> &bull; Pieces: ${item.product.pieces}
          </div>
          <div style="color: #a8a29e; font-size: 11px; margin-top: 2px;">SKU: ${item.product.sku}</div>
        </td>
        <td style="padding: 12px 8px; text-align: center; vertical-align: top; color: #44403c; font-size: 14px;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; text-align: right; vertical-align: top; color: #1c1917; font-weight: 500; font-size: 14px;">
          ${originalPriceText}
          Rs. ${item.product.price}
        </td>
      </tr>
    `;
  }

  const receiptAttachedMessage = customer.bankReceiptImage 
    ? `<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-top: 15px; color: #166534; font-size: 13px;">
         <strong>&bull; Bank Deposit Proof Transfer Attached:</strong> The customer uploaded a digital receipt context image. View it at the bottom of this email.
       </div>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order ${id}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafaf9; margin: 0; padding: 20px; color: #44403c; -webkit-font-smoothing: antialiased;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
        
        <!-- Header Banner -->
        <div style="background-color: #1c1917; color: #ffffff; padding: 30px 24px; text-align: center;">
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase;">Akash Collection Wholesale</h1>
          <p style="margin: 8px 0 0 0; color: #d6d3d1; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; font-family: monospace;">New Web Order Received</p>
        </div>

        <div style="padding: 24px;">
          <!-- Order Meta Header -->
          <div style="border-bottom: 2px solid #f5f5f4; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between;; flex-wrap: wrap;">
            <div style="margin-bottom: 10px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a8a29e; font-family: monospace; display: block;">Order Reference</span>
              <strong style="font-size: 18px; color: #1c1917;">${id}</strong>
            </div>
            <div style="text-align: right; margin-bottom: 10px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a8a29e; font-family: monospace; display: block;">Date Logged</span>
              <span style="font-size: 14px; color: #44403c; font-weight: 500;">${date}</span>
            </div>
          </div>

          <!-- Customer info blocks -->
          <div style="margin-bottom: 24px;">
            <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #78716c; border-bottom: 1px solid #f5f5f4; padding-bottom: 6px;">Customer & Delivery Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
              <tr>
                <td style="padding: 4px 0; color: #78716c; width: 140px; font-weight: 500;">Name:</td>
                <td style="padding: 4px 0; color: #1c1917; font-weight: 600;">${customer.firstName} ${customer.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716c;">Email Address:</td>
                <td style="padding: 4px 0; color: #1c1917;"><a href="mailto:${customer.email}" style="color: #1c1917; text-decoration: underline;">${customer.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716c;">Contact Phone:</td>
                <td style="padding: 4px 0; color: #1c1917; font-weight: 600;"><a href="tel:${customer.phone}" style="color: #1c1917; text-decoration: none;">${customer.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716c; vertical-align: top;">Shipping Address:</td>
                <td style="padding: 4px 0; color: #1c1917;">
                  ${customer.address}<br>
                  ${customer.city}, ${customer.province} - ${customer.postalCode}<br>
                  <strong>Pakistan</strong>
                </td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716c; vertical-align: top;">Payment Method:</td>
                <td style="padding: 4px 0; color: #78716c;">
                  <strong style="color: #7c2d12; font-size: 13px; text-transform: uppercase;">${paymentMethodText}</strong>
                  ${receiptAttachedMessage}
                </td>
              </tr>
            </table>
          </div>

          <!-- Items Ordered Table -->
          <div style="margin-bottom: 24px;">
            <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #78716c; border-bottom: 1px solid #f5f5f4; padding-bottom: 6px;">Line Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #e7e5e4; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #78716c;">
                  <th style="padding: 8px; width: 60px;">Image</th>
                  <th style="padding: 8px;">Product Description</th>
                  <th style="padding: 8px; text-align: center; width: 50px;">Qty</th>
                  <th style="padding: 8px; text-align: right; width: 100px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Totals Breakdown style -->
          <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; margin-top: 20px; font-size: 13px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #78716c;">Subtotal</td>
                <td style="padding: 4px 0; text-align: right; color: #44403c;">Rs. ${subtotal}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716c;">Est. Shipping & Handling</td>
                <td style="padding: 4px 0; text-align: right; color: #44403c;">${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</td>
              </tr>
              <tr style="border-top: 1px solid #e7e5e4; font-size: 16px; font-weight: bold;">
                <td style="padding: 8px 0 0 0; color: #1c1917;">Total Billing</td>
                <td style="padding: 8px 0 0 0; text-align: right; color: #7c2d12;">Rs. ${total}</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="background-color: #fafaf9; border-top: 1px solid #e7e5e4; padding: 20px 24px; text-align: center; font-size: 11px; color: #78716c;">
          <p style="margin: 0;">This order email notification was dispatched directly from your virtual e-commerce system.</p>
          <p style="margin: 4px 0 0 0; font-family: monospace;">Akash Collection Wholesale Pakistan &bull; Powered by RanginGfx.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// API Post logic to place order & mail it
app.post("/api/place-order", async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res.status(400).json({ error: "Missing order metadata in request body." });
    }

    // Set recipient email
    const recipientEmail = (process.env.ADMIN_EMAIL || "akashcollection.pk@gmail.com").trim();

    // Set up SMTP configuration
    // Attempt to read custom SMTP transport details from variables if present
    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : "";
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim().replace(/\s/g, "") : "";

    // Create a fail-safe dual-routing recipient target including the customer's inbox!
    const recipientList = [recipientEmail];
    if (smtpUser && smtpUser.length > 0 && !recipientList.includes(smtpUser)) {
      recipientList.push(smtpUser);
    }
    if (order.customer && order.customer.email) {
      const custEmail = order.customer.email.trim();
      if (custEmail.length > 0 && !recipientList.includes(custEmail)) {
        recipientList.push(custEmail);
      }
    }
    const finalRecipients = recipientList.join(", ");

    console.log(`Processing order request ${order.id}. Preparing email dispatch to: ${finalRecipients}...`);

    let isEmailSent = false;
    let mailError = "";

    if (smtpUser && smtpPass) {
      try {
        // Create transport object perfectly aligned to verified test-email
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // True for 465, false for 587
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 10000 // 10s connection timeout
        });

        // Prepare attachment array (e.g. for Bank Receipt Transfer proofs)
        const attachments = [];
        const hasBase64Receipt = order.customer.bankReceiptImage && order.customer.bankReceiptImage.startsWith("data:");
        
        if (hasBase64Receipt) {
          try {
            // Extract format/mime & actual content
            const parts = order.customer.bankReceiptImage.split(",");
            const content = parts[1];
            const mimePart = parts[0].match(/:(.*?);/);
            const mimeType = mimePart ? mimePart[1] : "image/png";
            const extension = mimeType.split("/")[1] || "png";

            attachments.push({
              filename: `bank_receipt_${order.id}.${extension}`,
              content: Buffer.from(content, "base64"),
              contentType: mimeType
            });
          } catch (attachErr: any) {
            console.error("Failed to compile base64 bank receipt into attachment:", attachErr);
          }
        }

        // Format clean text description
        const lineItemsDesc = order.items.map((it: any) => `${it.product.title} (${it.selectedSize}) x${it.quantity} - Rs. ${it.product.price}`).join(", ");
        
        // Dispatch with high-deliverability clean subject and dual recipients
        const info = await transporter.sendMail({
          from: `"Akash Collection" <${smtpUser}>`,
          to: finalRecipients,
          subject: `Order Confirmation - Akash Collection #${order.id}`,
          text: `New order ${order.id} received on ${order.date}.\n\n` +
                `Customer: ${order.customer.firstName} ${order.customer.lastName}\n` +
                `Contact: ${order.customer.phone} / ${order.customer.email}\n` +
                `Delivery Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.province}\n` +
                `Payment Method: ${order.customer.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery (COD)'}\n\n` +
                `Items: ${lineItemsDesc}\n\n` +
                `Subtotal: Rs. ${order.subtotal}\n` +
                `Shipping: Rs. ${order.shippingFee}\n` +
                `Total: Rs. ${order.total}\n`,
          html: generateOrderHtml(order),
          attachments: attachments
        });

        isEmailSent = true;
        console.log(`Order ${order.id} notification successfully emailed. Response:`, info);
      } catch (err: any) {
        console.error("Error dispatching SMTP e-mail:", err);
        mailError = `SMTP sending error: ${err.message || err}`;
      }
    } else {
      console.warn("SMTP_USER and/or SMTP_PASS are missing from environment settings. Email not sent.");
      mailError = "SMTP credentials missing. Please set SMTP_USER and SMTP_PASS variables in the environment to enable direct notification emails.";
    }

    // Always succeed in recording order
    return res.json({ 
      success: true, 
      id: order.id, 
      emailSent: isEmailSent,
      recipient: finalRecipients,
      message: isEmailSent 
        ? `Order notification email dispatched successfully to ${finalRecipients}!` 
        : `Order created, but email notification could not be dispatched: ${mailError}` 
    });

  } catch (err: any) {
    console.error("Error processing order dispatch route:", err);
    return res.status(500).json({ 
      error: "Server processing exception", 
      details: err.message || err 
    });
  }
});

// Vite middleware / production serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
