import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Resend Client
let resendClient: Resend | null = null;
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not configured.");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// API: Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "nithivisual@gmail.com",
    timestamp: new Date().toISOString()
  });
});

// API: Contact / Project Inquiry Submission via Resend Only
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, projectType, budget, timeline, message } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || typeof email !== "string" || !email.trim() || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email address is required." });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanProjectType = projectType ? String(projectType).trim() : "Not specified";
    const cleanBudget = budget ? String(budget).trim() : "Not specified";
    const cleanTimeline = timeline ? String(timeline).trim() : "Not specified";
    const cleanMessage = message ? String(message).trim() : "None provided";

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "nithivisual@gmail.com";
    const emailSubject = "New Project Inquiry — Nithi Visual";

    const plainText = `
New Project Inquiry — Nithi Visual

Name: ${cleanName}
Email: ${cleanEmail}
Project Type: ${cleanProjectType}
Budget Estimate: ${cleanBudget}
Timeline: ${cleanTimeline}
Project Brief & Links:
${cleanMessage}
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F6; color: #353535; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(53,53,53,0.1); padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
    .header { border-bottom: 2px solid #ECE4DB; padding-bottom: 18px; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 4px 12px; background: #353535; color: #ffffff; font-size: 11px; font-weight: 700; border-radius: 9999px; letter-spacing: 0.05em; text-transform: uppercase; }
    h2 { font-size: 22px; color: #353535; margin: 12px 0 4px 0; font-weight: 700; }
    .item { margin-bottom: 16px; }
    .label { font-size: 11px; font-family: monospace; color: #737373; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
    .value { font-size: 15px; color: #353535; margin-top: 4px; font-weight: 500; }
    .box { background: #FAF9F6; border: 1px solid rgba(53,53,53,0.1); border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #353535; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #ECE4DB; font-size: 12px; color: #999999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">Nithi Visual Inquiry</span>
      <h2>New Project Inquiry</h2>
    </div>

    <div class="item">
      <div class="label">Name</div>
      <div class="value"><strong>${cleanName}</strong></div>
    </div>

    <div class="item">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${cleanEmail}" style="color: #353535; text-decoration: underline;">${cleanEmail}</a></div>
    </div>

    <div class="item">
      <div class="label">Project Type</div>
      <div class="value">${cleanProjectType}</div>
    </div>

    <div class="item">
      <div class="label">Budget Estimate</div>
      <div class="value">${cleanBudget}</div>
    </div>

    <div class="item">
      <div class="label">Timeline</div>
      <div class="value">${cleanTimeline}</div>
    </div>

    <div class="item">
      <div class="label">Project Brief & Links</div>
      <div class="box">${cleanMessage}</div>
    </div>

    <div class="footer">
      Delivered via Resend • Nithi Visual Studio
    </div>
  </div>
</body>
</html>
`.trim();

    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key missing in environment variables (RESEND_API_KEY).");
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again or contact us directly."
      });
    }

    const resend = getResend();
    const { error: resendError } = await resend.emails.send({
      from: "Nithi Visual <onboarding@resend.dev>",
      to: [receiverEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      text: plainText,
      html: htmlBody
    });

    if (resendError) {
      console.error("Resend delivery failed:", resendError);
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again or contact us directly."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks! Your project inquiry has been sent successfully."
    });
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again or contact us directly."
    });
  }
});

// Vite & Static file serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nithi Visual Server running on port ${PORT}`);
  });
}

start();
