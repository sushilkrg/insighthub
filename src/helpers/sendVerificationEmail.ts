import nodemailer from "nodemailer";
// import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<any> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "skpersonal100@gmail.com",
    to: email,
    subject: "Insighthub OTP Verification Code",
    text: `Your OTP is ${verifyCode}. It is valid for 10 minutes.`,
    // react: VerificationEmail({username, otp: verifyCode})
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
