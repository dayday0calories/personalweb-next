/**
 * 📩 Contact Form Email API (POST)
 * --------------------------------
 * Serverless API endpoint for sending contact form submissions via Resend.
 *
 * ✅ Purpose:
 *   - Accepts JSON payloads containing `name`, `email`, and `message`.
 *   - Validates input and securely sends an email using the Resend API.
 *   - Provides structured HTTP responses for both client and server errors.
 *
 * 🧩 Stack:
 *   - Next.js App Router API Route (Edge-compatible)
 *   - Resend SDK for transactional email delivery
 *   - TypeScript for safety and maintainability
 *
 * 🛡️ Security Considerations:
 *   - API keys are loaded only from environment variables.
 *   - Basic payload sanitization is applied via `.trim()`.
 *   - Avoids returning sensitive error details to the client.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

// -----------------------------------------------------
// 🔧 Resend Configuration
// -----------------------------------------------------
// Initialize the Resend client using a server-side API key.
// This key must be stored securely in your environment (never committed).
const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender address (must be a verified domain in Resend)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

// Fallback recipient address — defaults to the sender if not specified.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? FROM_EMAIL;

// -----------------------------------------------------
// 🔸 POST Handler
// -----------------------------------------------------
// The only supported HTTP method: accepts JSON data from the frontend contact form.
export async function POST(request: Request) {
  // -----------------------------------------------------
  // 🧱 Step 1: Validate environment configuration
  // -----------------------------------------------------
  if (!FROM_EMAIL || !TO_EMAIL) {
    return NextResponse.json(
      { error: "Email settings are incomplete on the server." },
      { status: 500 } // 500 → Server misconfiguration
    );
  }

  try {
    // -----------------------------------------------------
    // 🧱 Step 2: Parse and sanitize incoming JSON payload
    // -----------------------------------------------------
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    // Trim whitespace and validate all fields
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const message = payload.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide name, email, and message." },
        { status: 400 } // 400 → Bad Request (client-side validation failure)
      );
    }

    // -----------------------------------------------------
    // 🧱 Step 3: Construct formatted email content
    // -----------------------------------------------------
    const formattedBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    // -----------------------------------------------------
    // 🧱 Step 4: Dispatch email through Resend
    // -----------------------------------------------------
    await resend.emails.send({
      from: FROM_EMAIL, // Sender identity (must match verified domain)
      to: TO_EMAIL, // Recipient (you or a configured inbox)
      replyTo: email, // Makes replies go back to the sender
      subject: `New portfolio inquiry from ${name}`, // Custom subject line
      text: formattedBody, // Simple text-based email body
    });

    // -----------------------------------------------------
    // 🧱 Step 5: Respond with success
    // -----------------------------------------------------
    return NextResponse.json({ ok: true });
  } catch (error) {
    // -----------------------------------------------------
    // 🧱 Step 6: Handle unexpected errors gracefully
    // -----------------------------------------------------
    console.error("Contact form failed:", error);

    // Do not expose internal error details to the client
    return NextResponse.json(
      { error: "Unable to send message at this time." },
      { status: 500 }
    );
  }
}
