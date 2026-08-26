import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, comment } = await req.json();

    if (!name || !email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid name and email address" },
        { status: 400 },
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_TO_EMAIL ||
      !process.env.CONTACT_FROM_EMAIL
    ) {
      return NextResponse.json(
        { message: "Contact form is not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeName = String(name).replace(/[\r\n]+/g, " ").slice(0, 200);

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${comment || ""}`,
    });

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/contact error:", error);

    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 },
    );
  }
}
