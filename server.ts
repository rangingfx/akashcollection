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
    const recipientEmail = process.env.ADMIN_EMAIL || "rangingfx@gmail.com";

    // Set up SMTP configuration
    // Attempt to read custom SMTP transport details from variables if present
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    console.log(`Processing order request ${order.id}. Preparing email dispatch to ${recipientEmail}...`);

    let isEmailSent = false;
    let mailError = "";

    if (smtpUser && smtpPass) {
      // Create transport object
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // True for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
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
      
      // Dispatch
      await transporter.sendMail({
        from: `"Akash Collection Wholesale E-shop" <${smtpUser}>`,
        to: recipientEmail,
        subject: `[NEW ORDER] Order ID: ${order.id} - Customer: ${order.customer.firstName} ${order.customer.lastName}`,
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
      console.log(`Order ${order.id} notification successfully emailed to ${recipientEmail}.`);
    } else {
      console.warn("SMTP_USER and/or SMTP_PASS are missing from environment settings. Email not sent.");
      mailError = "SMTP credentials missing. Please set SMTP_USER and SMTP_PASS variables in the environment to enable direct notification emails.";
    }

    // Always succeed in recording order
    return res.json({ 
      success: true, 
      id: order.id, 
      emailSent: isEmailSent,
      recipient: recipientEmail,
      message: isEmailSent 
        ? `Order notification email dispatched successfully to ${recipientEmail}!` 
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
