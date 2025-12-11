import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.json();
    console.log("Contact form payload:", form);

    if (form.hp) {
      console.log("🪤 Honeypot triggered, ignoring");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const solutions = Array.isArray(form.solutions) ? form.solutions.join(", ") : form.solutions || "—";
    const platforms = Array.isArray(form.platform) ? form.platform.join(", ") : form.platform || "—";

    const html = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${form.name || "—"}</p>
      <p><strong>Email:</strong> ${form.email || "—"}</p>
      <p><strong>Phone:</strong> ${form.phone || "—"}</p>
      <p><strong>City:</strong> ${form.city || "—"}</p>
      <p><strong>Looking for:</strong> ${form.reason || "—"}</p>
      <p><strong>Budget:</strong> ${form.budget || "—"}</p>
      <p><strong>Solutions of interest:</strong> ${solutions}</p>
      <p><strong>Preferred ecosystems:</strong> ${platforms}</p>
      <p><strong>Contact preference:</strong> ${form.contact_pref || "—"}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${form.message || "—"}</blockquote>
    `;

    const result = await resend.emails.send({
      from: "Solenergy Contact <info@solenergy.me>",
      to: "solenergysarl@gmail.com",
      subject: "New Contact Form Submission",
      html,
    });

    console.log("Resend API response:", result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Failed to send" }, { status: 500 });
  }
}
