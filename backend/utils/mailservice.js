import { Resend } from "resend"

const resend = new Resend(process.env.MAIL_PASS)

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`

  await resend.emails.send({
    from: "Support <nonreply@Musk.com>", // use your domain here if you added one
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Forgot your password?</h2>
      <p>Click the link below to reset it. This link expires in <strong>15 minutes</strong>.</p>
      <a href="${resetURL}" style="
        display: inline-block;
        padding: 12px 24px;
        background: #4F46E5;
        color: white;
        border-radius: 6px;
        text-decoration: none;
      ">
        Reset Password
      </a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  })
}