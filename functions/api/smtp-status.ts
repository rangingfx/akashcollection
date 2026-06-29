interface Env {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  ADMIN_EMAIL?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const host = (context.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = (context.env.SMTP_PORT || "587").trim();
  const user = context.env.SMTP_USER ? context.env.SMTP_USER.trim() : "";
  const adminEmail = (context.env.ADMIN_EMAIL || user || "akashcollection.pk@gmail.com").trim();

  // Safe masking for user secrets
  let maskedUser = "Not Configured";
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

  return new Response(
    JSON.stringify({
      configured: !!(user && context.env.SMTP_PASS),
      host,
      port,
      user: maskedUser,
      adminEmail,
      hasSmtpUser: !!user,
      hasSmtpPass: !!context.env.SMTP_PASS,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
};
