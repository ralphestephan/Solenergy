// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase, SOLENERGY_ORG_ID, type ContactFormSubmission } from "@/lib/supabase";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY || 're_GNE1Zft7_FK2SbKxwuNFrxumZQNP9wVi1';
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

// Branded email template for contact form confirmation to user
function getContactConfirmationEmail(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #1f2937; font-size: 28px; font-weight: 700;">Thank You, ${name}!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                We've received your contact form submission and our solar energy experts will get back to you within 24 hours.
              </p>
              
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to reach out to us directly:
              </p>
              
              <div style="background-color: #f9fafb; border-left: 4px solid #F4B41A; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px; font-weight: 600;">📞 Phone: <a href="tel:+96171654956" style="color: #F4B41A; text-decoration: none;">+961 71 654 956</a></p>
                <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px; font-weight: 600;">✉️ Email: <a href="mailto:info@solenergypower.com" style="color: #F4B41A; text-decoration: none;">info@solenergypower.com</a></p>
                <p style="margin: 0 0 5px 0; color: #1f2937; font-size: 14px; font-weight: 600;">📍 <strong>LB:</strong> Galaxy Mall, Baabda, Mount Lebanon</p>
                <p style="margin: 0; color: #1f2937; font-size: 14px; font-weight: 600;">📍 <strong>QR:</strong> Doha, Qatar</p>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #F4B41A;">The Solenergy Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Solenergy. All rights reserved.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                30 Years Experience • 50+ MW Installed • 1kW to 1MW Projects
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Branded email template for contact form notification to admin
function getContactNotificationEmail(form: any) {
  const solutions = Array.isArray(form.solutions) ? form.solutions.join(", ") : form.solutions || "—";
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Name:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.name || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Email:</strong>
                    <a href="mailto:${form.email || ''}" style="color: #F4B41A; margin-left: 10px; text-decoration: none;">${form.email || "—"}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Phone:</strong>
                    <a href="tel:${form.phone || ''}" style="color: #F4B41A; margin-left: 10px; text-decoration: none;">${form.phone || "—"}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">City:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.city || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Looking For:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.reason || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Property Type:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.property || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Budget:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.budget || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Solutions of Interest:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${solutions}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Contact Preference:</strong>
                    <span style="color: #6b7280; margin-left: 10px;">${form.contact_pref || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151;">Message:</strong>
                    <div style="background-color: #f9fafb; padding: 15px; margin-top: 10px; border-radius: 6px; color: #374151; line-height: 1.6;">
                      ${form.message || "—"}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Solenergy Contact Form • ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const resend = getResend();
    const form = await req.json();
    console.log("Contact form payload:", form);

    // Honeypot check
    if (form.hp) {
      console.log("🪤 Honeypot triggered, ignoring");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Prepare metadata - only for extra data NOT in the database schema
    // Fields like city, reason, budget, contact_pref, phone, email are already in the schema
    // Send as object, not stringified - can be {} if empty
    const metadata: Record<string, any> = {};
    if (form.property) metadata.property = form.property;
    if (form.solutions) {
      metadata.solutions = Array.isArray(form.solutions) ? form.solutions : [form.solutions];
    }
    // Add any other extra fields that aren't in the schema here

    // Save to Supabase using BDI Systems schema
    // Include schema fields as direct properties, not in metadata
    const { data, error } = await supabase
      .from('contact_form_submissions')
      .insert([
        {
          organization_id: SOLENERGY_ORG_ID,
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          message: form.message || null,
          city: form.city || null,
          reason: form.reason || null,
          budget: form.budget || null,
          contact_pref: form.contact_pref || null,
          source: 'website',
          status: 'new',
          metadata: metadata, // Send as object, not stringified - can be {}
        }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      // Continue even if DB save fails - still send emails
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "Solenergy <info@solenergypower.com>",
        to: form.email,
        subject: "Thank You for Contacting Solenergy",
        html: getContactConfirmationEmail(form.name || "Valued Customer"),
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    // Send notification email to admin
    await resend.emails.send({
      from: "Solenergy Contact <info@solenergypower.com>",
      to: "info@solenergypower.com",
      subject: "New Contact Form Submission",
      html: getContactNotificationEmail(form),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Failed to send" }, { status: 500 });
  }
}
