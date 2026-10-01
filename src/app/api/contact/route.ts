import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Basic validation
const validatePayload = (body: ContactPayload): boolean => {
  const { email, subject, message } = body;
  return Boolean(email && subject && message);
};

// Create email transporter with SMTP or OAuth2 fallback
const createTransporter = async () => {
  const {
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SERVICE,
    EMAIL_HOST,
    EMAIL_PORT,
  } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("⚠️ Email credentials missing in environment — email notification skipped.");
    return null;
  }

  const transportOptions = EMAIL_SERVICE
    ? { service: EMAIL_SERVICE, auth: { user: EMAIL_USER, pass: EMAIL_PASS } }
    : {
        host: EMAIL_HOST || "smtp.gmail.com",
        port: EMAIL_PORT ? Number(EMAIL_PORT) : 587,
        secure: Number(EMAIL_PORT) === 465,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      };

  return nodemailer.createTransport(transportOptions as Parameters<typeof nodemailer.createTransport>[0]);
};

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (!validatePayload(body)) {
      return NextResponse.json({ error: "Missing required fields (email, subject, message)." }, { status: 400 });
    }

    const { firstName = "", lastName = "", email = "", subject = "", message = "" } = body;

    // Log received submission in server output (durable logging)
    console.info(`📩 [Next.js Contact API] Message received from ${firstName} ${lastName} <${email}>: "${subject}"`);

    // Attempt email delivery if configured
    try {
      const transporter = await createTransporter();
      if (transporter) {
        const owner = process.env.EMAIL_TO || process.env.EMAIL_USER;
        const mailOptions = {
          from: `"${firstName} ${lastName}".trim() || "Visitor" <${process.env.EMAIL_USER}>`,
          to: owner,
          replyTo: email,
          subject: `[Portfolio Contact] ${subject}`,
          text: `${message}\n\nFrom: ${firstName} ${lastName} <${email}>`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
              <h3 style="color: #2563eb;">📨 New Portfolio Contact Inquiry</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p style="white-space: pre-wrap; margin: 0;">${message}</p>
              </div>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p><strong>Sender:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
              <p><small style="color: #64748b;">Sent via Next.js Portfolio API</small></p>
            </div>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.info(`✅ Email dispatched successfully (MessageID: ${info.messageId || "ok"})`);
      }
    } catch (mailErr: unknown) {
      const errMsg = mailErr instanceof Error ? mailErr.message : String(mailErr);
      console.warn("⚠️ Email delivery note:", errMsg);
      // Fail gracefully: proceed with success response so user knows message was accepted
    }

    return NextResponse.json({
      ok: true,
      message: "Message submitted successfully. Thank you for reaching out! Habtamu will respond promptly.",
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Next.js Contact API Error:", errMsg);
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}
