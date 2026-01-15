const nodemailer = require("nodemailer");

// Create transporter with better configuration
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn(
      "⚠️  Email credentials not configured! OTP will only be logged to console."
    );
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Add timeout and retry options
      pool: true,
      maxConnections: 5,
      maxMessages: 10,
      rateDelta: 1000,
      rateLimit: 5,
    });

    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Email configuration error:", error.message);
        console.log("\n📧 Email Setup Instructions:");
        console.log("1. Go to https://myaccount.google.com/security");
        console.log("2. Enable 2-Step Verification");
        console.log("3. Go to https://myaccount.google.com/apppasswords");
        console.log("4. Generate app password and update backend/.env\n");
      } else {
        console.log("✅ Email service ready!");
      }
    });

    return transporter;
  } catch (error) {
    console.error("❌ Failed to create email transporter:", error.message);
    return null;
  }
};

const transporter = createTransporter();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  // Log OTP to console for development
  console.log("\n" + "=".repeat(60));
  console.log("📧 OTP EMAIL DETAILS");
  console.log("=".repeat(60));
  console.log(`To: ${email}`);
  console.log(`Name: ${name}`);
  console.log(`OTP: ${otp}`);
  console.log(`Expires: 10 minutes`);
  console.log("=".repeat(60) + "\n");

  // If no transporter configured, return success but log warning
  if (!transporter) {
    console.warn("⚠️  Email not sent (credentials not configured)");
    console.log("💡 Use the OTP from console output above for testing\n");
    return { success: true, messageId: "console-only", mode: "development" };
  }

  try {
    const mailOptions = {
      from: `"Smart Trip AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Smart Trip AI Verification",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌍 Smart Trip AI</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Thank you for registering with Smart Trip AI. Please use the following OTP to verify your email address:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666;">Your OTP Code:</p>
                <div class="otp-code">${otp}</div>
              </div>
              
              <p><strong>This OTP is valid for 10 minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <div class="footer">
                <p>© 2026 Smart Trip AI. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully!");
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Sent to: ${email}\n`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    console.log("\n📧 Troubleshooting:");
    console.log("1. Check EMAIL_USER and EMAIL_PASSWORD in backend/.env");
    console.log("2. Make sure 2-Step Verification is enabled on Gmail");
    console.log("3. Use App Password, not your regular Gmail password");
    console.log(
      '4. Check if "Less secure app access" is disabled (use App Password instead)'
    );
    console.log(`\n💡 For now, use this OTP from console: ${otp}\n`);

    // Return success so registration doesn't fail, but log the error
    return { success: true, error: error.message, mode: "console-fallback" };
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  if (!transporter) {
    console.log("📧 Welcome email skipped (email not configured)");
    return;
  }

  try {
    const mailOptions = {
      from: `"Smart Trip AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Smart Trip AI! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌍 Welcome to Smart Trip AI!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}! 👋</h2>
              <p>Your account has been successfully verified! Welcome to the Smart Trip AI family.</p>
              <p>With Smart Trip AI, you can:</p>
              <ul>
                <li>🔍 Discover tourist attractions</li>
                <li>📊 Check real-time crowd predictions</li>
                <li>📅 Plan smart itineraries</li>
                <li>🔔 Get notified about best visiting times</li>
                <li>🗺️ Find alternative locations</li>
              </ul>
              <p>Start exploring now!</p>
              <a href="${process.env.FRONTEND_URL}" class="button">Go to Dashboard</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail,
};
