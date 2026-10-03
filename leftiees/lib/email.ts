import { Resend } from "resend";

export async function sendOtpEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set. Add it to your .env file.");
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? "Leftiees <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: email,
    subject: "Your Leftiees verification code",
    html: `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #171717;">
        <p style="font-size: 18px; font-weight: 600; margin: 0 0 24px;">Leftiees</p>
        <p style="font-size: 14px; line-height: 1.6; color: #52525b; margin: 0 0 16px;">
          Use the code below to verify your email address. It expires in 10 minutes.
        </p>
        <p style="font-size: 32px; font-weight: 600; letter-spacing: 0.3em; margin: 0 0 24px;">
          ${otp}
        </p>
        <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
          If you didn't create a Leftiees account, you can ignore this email.
        </p>
      </div>
    `,
  });
}
