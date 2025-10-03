import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "SMTP_USER",
  "SMTP_PASS",
  "ADMIN_EMAIL",
  "MONGODB_URI",
];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  console.error(
    "Please check your .env file and ensure all required variables are set."
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Render deployment (handles X-Forwarded-For headers)
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// CORS configuration for production deployment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Parse allowed origins from environment variable
    const allowedOrigins = (
      process.env.CORS_ORIGIN || "http://localhost:5173"
    ).split(",");

    console.log("Incoming Origin:", origin);
    console.log("Allowed Origins (from env):", allowedOrigins);
    console.log("CORS_ORIGIN env var:", process.env.CORS_ORIGIN);

    if (allowedOrigins.includes(origin)) {
      console.log("CORS: Origin allowed");
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  // Mobile-friendly CORS
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://one1eximoverseas.onrender.com", // backend Render URL
          "https://the11eximoverseas.com", // frontend domain
          "https://www.the11eximoverseas.com",
        ],
      },
    },
  })
);
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// Quote Request Schema
const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  product: { type: String, required: true },
  quantity: { type: String, required: true },
  requirements: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Quote = mongoose.model("Quote", quoteSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "the11eximoverseas@gmail.com",
    pass: process.env.SMTP_PASS || "ygio vunt hlca peel",
  },
});

// Helper function to get client IP
const getClientIP = (req) => {
  return (
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket?.remoteAddress ||
    "Unknown"
  );
};

// Helper function to send emails
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error);
    return false;
  }
};

// Input validation helper
const validateInput = (data, requiredFields) => {
  const errors = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  return errors;
};

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Validate required fields
    const validationErrors = validateInput(req.body, [
      "name",
      "email",
      "subject",
      "message",
    ]);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Get client details
    const ipAddress = getClientIP(req);
    const userAgent = req.get("User-Agent");

    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    await contact.save();
    console.log("✅ Contact form saved to database");

    // Send email to The11EximOverSeas
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - The11EximOverSeas</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); min-height: 100vh;">
        <div style="max-width: 700px; margin: 20px auto; background-color: #ffffff; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius: 20px; overflow: hidden;">
          <!-- Premium Header -->
          <div style="background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1;">
              <div style="background-color: rgba(255, 255, 255, 0.15); border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.2);">
                <span style="font-size: 50px;">📧</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">New Contact Form</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">The11EximOverSeas Website</p>
              <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 8px 20px; margin-top: 15px; display: inline-block; backdrop-filter: blur(10px);">
                <span style="color: #ffffff; font-size: 14px; font-weight: 600;">PRIORITY: HIGH</span>
              </div>
            </div>
          </div>
          
          <!-- Premium Content -->
          <div style="padding: 50px 40px;">
            <!-- Client Information Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; padding: 30px; margin-bottom: 30px; border-radius: 16px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(135deg, #0ea5e9, #0284c7); opacity: 0.1; border-radius: 0 16px 0 100px;"></div>
              <div style="position: relative; z-index: 1;">
                <h2 style="color: #0369a1; margin: 0 0 25px 0; font-size: 24px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">👤</span>
                  Client Information
                </h2>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">NAME</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${name}</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">EMAIL</span>
                    <a href="mailto:${email}" style="color: #0ea5e9; font-weight: 600; font-size: 16px; text-decoration: none;">${email}</a>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">PHONE</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${
                      phone || "Not provided"
                    }</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">COMPANY</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${
                      company || "Not provided"
                    }</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">SUBJECT</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${subject}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Card -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; padding: 30px; margin-bottom: 30px; border-radius: 16px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(135deg, #f59e0b, #d97706); opacity: 0.1; border-radius: 0 16px 0 100px;"></div>
              <div style="position: relative; z-index: 1;">
                <h3 style="color: #92400e; margin: 0 0 20px 0; font-size: 22px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">💬</span>
                  Client Message
                </h3>
                <div style="background-color: #ffffff; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                  <p style="color: #1f2937; margin: 0; line-height: 1.8; font-size: 16px; font-style: italic; position: relative;">
                    <span style="position: absolute; top: -10px; left: -10px; font-size: 24px; color: #f59e0b;">"</span>
                    ${message}
                    <span style="position: absolute; bottom: -15px; right: -5px; font-size: 24px; color: #f59e0b;">"</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Technical Details Card -->
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 1px solid #9ca3af; padding: 30px; margin-bottom: 30px; border-radius: 16px;">
              <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                <span style="background: linear-gradient(135deg, #6b7280, #4b5563); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">📊</span>
                Technical Details
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                  <div style="color: #6b7280; font-size: 14px; font-weight: 600; margin-bottom: 8px;">IP Address</div>
                  <div style="color: #1f2937; font-weight: 700; font-size: 16px; font-family: 'Courier New', monospace;">${ipAddress}</div>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                  <div style="color: #6b7280; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Timestamp</div>
                  <div style="color: #1f2937; font-weight: 700; font-size: 16px;">${new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>

            <!-- Reference ID Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; padding: 25px; margin-bottom: 30px; border-radius: 16px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">📋 Reference Information</h3>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="color: #6b7280; font-weight: 600;">Contact Reference ID:</span>
                  <span style="color: #1f2937; font-weight: 700; font-size: 18px; font-family: 'Courier New', monospace;">CF-${Date.now()
                    .toString()
                    .slice(-6)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #6b7280; font-weight: 600;">Submission Time:</span>
                  <span style="color: #1f2937; font-weight: 600;">${new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <!-- Action Required Card -->
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 1px solid #ef4444; padding: 30px; margin-bottom: 30px; border-radius: 16px; text-align: center;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">⚡ Action Required</h3>
              <p style="color: #7f1d1d; margin: 0; font-size: 16px; font-weight: 600;">
                Please respond to this client within 24 hours to maintain our service standards.
              </p>
            </div>

            <!-- Footer Info -->
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px; font-weight: 500;">
                This message was automatically generated from the The11EximOverSeas website contact form.
              </p>
            </div>
          </div>
          
          <!-- Premium Footer -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #374151, transparent);"></div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">The11EximOverSeas</h3>
              <p style="color: #9ca3af; margin: 0; font-size: 14px; font-weight: 500;">Your Trusted Global Trade Partner</p>
            </div>
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 The11EximOverSeas. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Contact Form: ${subject}`,
      adminEmailHtml
    );

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting The11EximOverSeas</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 40px;">✅</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You!</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px;">Your message has been received</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px;">Dear ${name},</h2>
              <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to The11EximOverSeas. We have successfully received your message and our team will get back to you within 24 hours.
              </p>
            </div>

            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; margin-bottom: 30px; border-radius: 12px;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">📝</span> Your Message
              </h3>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <p style="color: #1f2937; margin: 0; line-height: 1.6; font-style: italic;">"${message}"</p>
              </div>
            </div>

            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 25px; margin-bottom: 30px; border-radius: 12px;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">⏰</span> What's Next?
              </h3>
              <ul style="color: #1f2937; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll contact you using the email address you provided: <strong>${email}</strong></li>
                <li>If urgent, you can call us directly at our business number</li>
                <li>We look forward to helping you with your requirements</li>
              </ul>
            </div>

            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">🌍</span> About The11EximOverSeas
              </h3>
              <p style="color: #6b7280; margin: 0 0 15px 0; line-height: 1.6;">
                We are a leading export-import company specializing in premium agricultural products, spices, and global trade solutions. Our commitment to quality and customer satisfaction drives everything we do.
              </p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">🌾</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px;">Premium Products</div>
                </div>
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">🚚</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px;">Global Shipping</div>
                </div>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                <strong>Reference ID:</strong> CF-${Date.now()
                  .toString()
                  .slice(-6)}
              </p>
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                Please keep this reference ID for your records.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 10px 0; font-size: 18px;">Namaste EXIM</h3>
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">Your Trusted Global Trade Partner</p>
            </div>
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 The11EximOverSeas. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const userEmailSent = await sendEmail(
      email,
      "Thank you for contacting The11EximOverSeas",
      userEmailHtml
    );

    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.warn(
        "⚠️ Some emails failed to send, but contact form was saved to database"
      );
      res.status(200).json({
        success: true,
        message:
          "Contact form submitted successfully. We will get back to you within 24 hours. (Note: Email notifications may be delayed)",
      });
    } else {
      res.status(200).json({
        success: true,
        message:
          "Contact form submitted successfully. We will get back to you within 24 hours.",
      });
    }
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting contact form. Please try again.",
    });
  }
});

// Quote Request Endpoint
app.post("/api/quote", async (req, res) => {
  try {
    const { name, email, phone, company, product, quantity, requirements } =
      req.body;

    // Validate required fields
    const validationErrors = validateInput(req.body, [
      "name",
      "email",
      "product",
      "quantity",
    ]);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Get client details
    const ipAddress = getClientIP(req);
    const userAgent = req.get("User-Agent");

    // Save to database
    const quote = new Quote({
      name,
      email,
      phone,
      company,
      product,
      quantity,
      requirements,
      ipAddress,
      userAgent,
    });

    await quote.save();
    console.log("✅ Quote request saved to database");

    // Send email to The11EximOverSeas
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request - The11EximOverSeas</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); min-height: 100vh;">
        <div style="max-width: 700px; margin: 20px auto; background-color: #ffffff; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius: 20px; overflow: hidden;">
          <!-- Premium Header -->
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #4c1d95 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1;">
              <div style="background-color: rgba(255, 255, 255, 0.15); border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.2);">
                <span style="font-size: 50px;">💰</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">New Quote Request</h1>
              <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">The11EximOverSeas Website</p>
              <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 8px 20px; margin-top: 15px; display: inline-block; backdrop-filter: blur(10px);">
                <span style="color: #ffffff; font-size: 14px; font-weight: 600;">PRIORITY: URGENT</span>
              </div>
            </div>
          </div>
          
          <!-- Premium Content -->
          <div style="padding: 50px 40px;">
            <!-- Client Information Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; padding: 30px; margin-bottom: 30px; border-radius: 16px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(135deg, #0ea5e9, #0284c7); opacity: 0.1; border-radius: 0 16px 0 100px;"></div>
              <div style="position: relative; z-index: 1;">
                <h2 style="color: #0369a1; margin: 0 0 25px 0; font-size: 24px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">👤</span>
                  Client Information
                </h2>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">NAME</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${name}</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">EMAIL</span>
                    <a href="mailto:${email}" style="color: #0ea5e9; font-weight: 600; font-size: 16px; text-decoration: none;">${email}</a>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">PHONE</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${
                      phone || "Not provided"
                    }</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 80px; text-align: center;">COMPANY</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${
                      company || "Not provided"
                    }</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Details Card -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; padding: 30px; margin-bottom: 30px; border-radius: 16px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(135deg, #f59e0b, #d97706); opacity: 0.1; border-radius: 0 16px 0 100px;"></div>
              <div style="position: relative; z-index: 1;">
                <h3 style="color: #92400e; margin: 0 0 20px 0; font-size: 22px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">📦</span>
                  Product Details
                </h3>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 100px; text-align: center;">PRODUCT</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${product}</span>
                  </div>
                  <div style="display: flex; align-items: center; background-color: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 100px; text-align: center;">QUANTITY</span>
                    <span style="color: #1f2937; font-weight: 600; font-size: 16px;">${quantity}</span>
                  </div>
                  ${
                    requirements
                      ? `
                  <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-right: 16px; min-width: 100px; text-align: center; margin-top: 4px;">REQUIREMENTS</span>
                      <div style="flex: 1;">
                        <span style="color: #1f2937; font-weight: 600; font-size: 16px; line-height: 1.4; font-style: italic;">"${requirements}"</span>
                      </div>
                    </div>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>

            <!-- Technical Details Card -->
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 1px solid #9ca3af; padding: 30px; margin-bottom: 30px; border-radius: 16px;">
              <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                <span style="background: linear-gradient(135deg, #6b7280, #4b5563); color: white; padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-size: 16px;">📊</span>
                Technical Details
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                  <div style="color: #6b7280; font-size: 14px; font-weight: 600; margin-bottom: 8px;">IP Address</div>
                  <div style="color: #1f2937; font-weight: 700; font-size: 16px; font-family: 'Courier New', monospace;">${ipAddress}</div>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                  <div style="color: #6b7280; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Timestamp</div>
                  <div style="color: #1f2937; font-weight: 700; font-size: 16px;">${new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>

            <!-- Reference ID Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; padding: 25px; margin-bottom: 30px; border-radius: 16px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">📋 Reference Information</h3>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="color: #6b7280; font-weight: 600;">Quote Reference ID:</span>
                  <span style="color: #1f2937; font-weight: 700; font-size: 18px; font-family: 'Courier New', monospace;">QR-${Date.now()
                    .toString()
                    .slice(-6)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #6b7280; font-weight: 600;">Submission Time:</span>
                  <span style="color: #1f2937; font-weight: 600;">${new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <!-- Action Required Card -->
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 1px solid #ef4444; padding: 30px; margin-bottom: 30px; border-radius: 16px; text-align: center;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">⚡ Action Required</h3>
              <p style="color: #7f1d1d; margin: 0; font-size: 16px; font-weight: 600;">
                Please prepare and send a detailed quote within 24 hours to maintain our service standards.
              </p>
            </div>

            <!-- Footer Info -->
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px; font-weight: 500;">
                This quote request was automatically generated from the The11EximOverSeas website.
              </p>
            </div>
          </div>
          
          <!-- Premium Footer -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #374151, transparent);"></div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">The11EximOverSeas</h3>
              <p style="color: #9ca3af; margin: 0; font-size: 14px; font-weight: 500;">Your Trusted Global Trade Partner</p>
            </div>
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 The11EximOverSeas. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Quote Request: ${product}`,
      adminEmailHtml
    );

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Request Received - The11EximOverSeas</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 40px;">💰</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Quote Request Received!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 18px;">We'll prepare your quote within 24 hours</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px;">Dear ${name},</h2>
              <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in our products! We have received your quote request and our team will prepare a detailed quote for you within 24 hours.
              </p>
            </div>

            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; margin-bottom: 30px; border-radius: 12px;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">📦</span> Your Quote Request
              </h3>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-weight: 500;">Product:</span>
                    <span style="color: #1f2937; font-weight: 600;">${product}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-weight: 500;">Quantity:</span>
                    <span style="color: #1f2937; font-weight: 600;">${quantity}</span>
                  </div>
                  ${
                    requirements
                      ? `
                  <div style="padding: 8px 0;">
                    <span style="color: #6b7280; font-weight: 500; display: block; margin-bottom: 8px;">Special Requirements:</span>
                    <span style="color: #1f2937; font-style: italic; line-height: 1.4;">"${requirements}"</span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>

            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 25px; margin-bottom: 30px; border-radius: 12px;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">⏰</span> What Happens Next?
              </h3>
              <ul style="color: #1f2937; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Our pricing team will analyze your requirements</li>
                <li>We'll prepare a detailed quote with competitive pricing</li>
                <li>You'll receive the quote via email within 24 hours</li>
                <li>Our sales team will follow up to discuss the details</li>
                <li>We'll work with you to finalize the order</li>
              </ul>
            </div>

            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 8px;">🌟</span> Why Choose The11EximOverSeas?
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">🏆</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">Premium Quality</div>
                  <div style="color: #6b7280; font-size: 12px;">Certified products</div>
                </div>
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">🌍</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">Global Reach</div>
                  <div style="color: #6b7280; font-size: 12px;">Worldwide shipping</div>
                </div>
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">⚡</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">Fast Delivery</div>
                  <div style="color: #6b7280; font-size: 12px;">Quick turnaround</div>
                </div>
                <div style="text-align: center; padding: 15px; background-color: #ffffff; border-radius: 8px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">🤝</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">Expert Support</div>
                  <div style="color: #6b7280; font-size: 12px;">24/7 assistance</div>
                </div>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                <strong>Quote Reference ID:</strong> QR-${Date.now()
                  .toString()
                  .slice(-6)}
              </p>
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                Please keep this reference ID for your records.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 10px 0; font-size: 18px;">Namaste EXIM</h3>
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">Your Trusted Global Trade Partner</p>
            </div>
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 The11EximOverSeas. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const userEmailSent = await sendEmail(
      email,
      "Quote Request Received - The11EximOverSeas",
      userEmailHtml
    );

    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.warn(
        "⚠️ Some emails failed to send, but quote request was saved to database"
      );
      res.status(200).json({
        success: true,
        message:
          "Quote request submitted successfully. We will get back to you within 24 hours. (Note: Email notifications may be delayed)",
      });
    } else {
      res.status(200).json({
        success: true,
        message:
          "Quote request submitted successfully. We will get back to you within 24 hours.",
      });
    }
  } catch (error) {
    console.error("❌ Quote request error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting quote request. Please try again.",
    });
  }
});

// Documents API endpoints
app.get("/api/documents", (req, res) => {
  try {
    const documents = [
      {
        id: 1,
        title: "FIEO Certificate - Yawal Gupta",
        category: "certifications",
        type: "PDF",
        size: "2.4 MB",
        date: "2024-01-15",
        description:
          "Federation of Indian Export Organizations certificate for international trade operations",
        filePath: "/documents/fieo certificate yawal gupta.pdf",
        tags: ["Export", "FIEO", "International Trade"],
      },
      {
        id: 2,
        title: "RCMC APEDA Certificate - Yawal Gupta",
        category: "certifications",
        type: "PDF",
        size: "1.8 MB",
        date: "2023-12-20",
        description:
          "Registration-cum-Membership Certificate from Agricultural and Processed Food Products Export Development Authority",
        filePath: "/documents/rcmc APEDA YG.pdf",
        tags: ["APEDA", "Agriculture", "Export"],
      },
      {
        id: 3,
        title: "Business License",
        category: "licenses",
        type: "PDF",
        size: "3.2 MB",
        date: "2024-02-10",
        description:
          "Official business license for export-import operations and international trade",
        filePath: "/documents/license.pdf",
        tags: ["Business", "License", "Trade"],
      },
    ];

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("❌ Documents API error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching documents",
    });
  }
});

// Team API endpoints
app.get("/api/team", (req, res) => {
  try {
    const teamMembers = [
      {
        id: 1,
        name: "Hukam Chand Gupta",
        position: "Director",
        image: "/images/Hukam Chand Gupta.jpeg",
        bio: "Visionary leader with extensive experience in international trade and agricultural exports. Passionate about connecting India's finest products to global markets and building sustainable business relationships.",
        experience: "25+ years",
        expertise: [
          "International Trade",
          "Strategic Planning",
          "Business Development",
          "Agricultural Exports",
        ],
        linkedin: "#",
        email: "hukam@the11eximoverseas.com",
        achievements: [
          "Established global trade network",
          "Led successful export operations",
          "Industry leadership recognition",
        ],
      },
      {
        id: 2,
        name: "Yawal Gupta",
        position: "Director",
        image: "/images/Yawal Gupta.jpeg",
        bio: "Dynamic leader specializing in modern trade practices and digital transformation of export-import operations. Committed to innovation and excellence in international business.",
        experience: "15+ years",
        expertise: [
          "Digital Trade Solutions",
          "Export Operations",
          "Client Relations",
          "Market Development",
        ],
        linkedin: "#",
        email: "yawal@the11eximoverseas.com",
        achievements: [
          "Modernized trade processes",
          "Expanded market reach",
          "Technology integration success",
        ],
      },
    ];

    res.status(200).json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error("❌ Team API error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching team data",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The11EximOverSeas API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Root API endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The11EximOverSeas API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact",
      quote: "/api/quote",
      documents: "/api/documents",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email configured for: ${process.env.SMTP_USER}`);
  console.log(`🗄️  Database: the11eximoverseas`);
});
