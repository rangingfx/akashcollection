interface Env {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  ADMIN_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const smtpHost = (context.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = parseInt(context.env.SMTP_PORT || "587", 10);
    const smtpUser = context.env.SMTP_USER ? context.env.SMTP_USER.trim() : "";
    const smtpPass = context.env.SMTP_PASS ? context.env.SMTP_PASS.trim().replace(/\s/g, "") : "";
    const adminEmail = (context.env.ADMIN_EMAIL || smtpUser || "akashcollection.pk@gmail.com").trim();

    if (!smtpUser || !smtpPass) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "SMTP user/password is missing from environment. Please configure SMTP_USER and SMTP_PASS variables to enable email notifications.",
          diagnostics: { smtpHost, smtpPort, smtpUserExists: !!smtpUser, smtpPassExists: !!smtpPass }
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Dynamic import to avoid build errors if nodejs_compat isn't enabled
    let nodemailerModule;
    try {
      nodemailerModule = await import("nodemailer");
    } catch (e: any) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Could not load nodemailer in Cloudflare Pages. Please make sure 'nodejs_compat' compatibility flag is enabled under your Pages project Settings -> Functions -> Compatibility flags.",
          errorDetails: e.message
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const transporter = nodemailerModule.default.createTransport({
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
      connectionTimeout: 10000
    });

    await transporter.verify();

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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Direct SMTP Server Diagnostic is 100% Successful!",
        recipient: adminEmail,
        info: {
          messageId: info.messageId,
          envelope: info.envelope,
          accepted: info.accepted
        }
      }),
      { headers: { "content-type": "application/json" } }
    );

  } catch (err: any) {
    let explanation = err.message || "Unknown mail server connection error";
    let recommendations = "Please verify your server SMTP credentials under Workspace settings.";
    
    const lowerMsg = (err.message || "").toLowerCase();
    
    if (lowerMsg.includes("invalid login") || err.code === "EAUTH" || lowerMsg.includes("username and password not accepted")) {
      explanation = "Authentication credentials rejected by Gmail SMTP servers.";
      recommendations = "Gmail requires an App Password! Since May 2022, regular Google account passwords do not work. To solve this, log into Gmail Account settings -> Security -> Turn on '2-Step Verification' -> search for 'App Passwords', choose 'Other' and copy the 16-character code into your SMTP_PASS variable.";
    } else if (err.code === "ESOCKET" || err.code === "ETIMEDOUT") {
      explanation = "Network connection timeout or unreachable host port.";
      recommendations = "Verify your SMTP_HOST and SMTP_PORT are correct. Ensure that you have specified 'smtp.gmail.com' for Gmail or your custom mail-server configurations.";
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: explanation,
        errorDetails: err.message,
        errorCode: err.code || "N/A",
        recommendations: recommendations,
        diagnostics: {
          host: context.env.SMTP_HOST || "smtp.gmail.com",
          port: context.env.SMTP_PORT || "587"
        }
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
