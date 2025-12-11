import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Forward to your inbox
    await resend.emails.send({
      from: "Solenergy Newsletter <info@solenergy.me>", // domain must be verified in Resend
      to: "solenergysarl@gmail.com", // this is where you get notified
      subject: "New Newsletter Subscription",
      html: `<p>Someone just subscribed to our newsletter:</p>
             <p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
