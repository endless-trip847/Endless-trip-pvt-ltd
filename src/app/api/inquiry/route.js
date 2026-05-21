import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const { package_name, name, email, phone, message } = body;

    if (!name || !email || !phone) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    const safeMessage = message || "No message provided";

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = `
      <div style="font-family:Arial;padding:20px">
        <h2 style="background:#421c58;color:#fff;padding:10px">
          New Package Inquiry
        </h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td><b>Package</b></td><td>${package_name}</td></tr>
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>Message</b></td><td>${safeMessage}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Endless Trips" <${process.env.MAIL_USER}>`,
      to: "digital@nextgenbusiness.co.in",
      replyTo: email,
      subject: `New Package Inquiry: ${package_name}`,
      html,
      text: `
New Package Inquiry

Package: ${package_name}
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${safeMessage}
      `,
    });

    return Response.json({
      success: true,
      message: "Inquiry sent successfully",
    });

  } catch (error) {
    console.error("Inquiry error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
