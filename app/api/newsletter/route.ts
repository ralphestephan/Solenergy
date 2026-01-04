// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase, SOLENERGY_ORG_ID, type NewsletterSubscriber } from "@/lib/supabase";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY || 're_GNE1Zft7_FK2SbKxwuNFrxumZQNP9wVi1';
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

// Branded email template for newsletter subscription confirmation
function getNewsletterConfirmationEmail() {
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
              <h1 style="margin: 0; color: #1f2937; font-size: 28px; font-weight: 700;">Welcome to Solenergy!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to our newsletter! You'll now receive the latest updates on:
              </p>
              
              <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.8;">
                <li>Solar energy solutions and innovations</li>
                <li>Energy management tips and best practices</li>
                <li>Industry insights and market updates</li>
                <li>Special offers and promotions</li>
              </ul>
              
              <div style="background-color: #f9fafb; border-left: 4px solid #F4B41A; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6;">
                  <strong>30 Years Experience • 50+ MW Installed • Projects from 1kW to 1MW</strong>
                </p>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                We promise to keep our emails valuable and never spam you.
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
                Galaxy Mall, Baabda, Mount Lebanon • Doha, Qatar
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

// Branded email template for newsletter subscription notification to admin
function getNewsletterNotificationEmail(email: string) {
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
              <h1 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">New Newsletter Subscription</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Someone just subscribed to your newsletter:
              </p>
              
              <div style="background-color: #f9fafb; border-left: 4px solid #F4B41A; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                  📧 <a href="mailto:${email}" style="color: #F4B41A; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Subscription Date: ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Solenergy Newsletter • ${new Date().toLocaleString()}
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
    const { email, name, phone } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Prepare metadata
    const metadata: Record<string, any> = {};
    if (name) metadata.name = name;
    if (phone) metadata.phone = phone;

    // Save to Supabase using BDI Systems schema with upsert to handle duplicates
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          organization_id: SOLENERGY_ORG_ID,
          email: email,
          name: name || null,
          phone: phone || null,
          source: 'website',
          status: 'active',
          metadata: metadata,
        },
        {
          onConflict: 'organization_id,email',
        }
      )
      .select();

    if (error) {
      // If it's a duplicate, that's okay - just return success
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }
      console.error("Supabase error:", error);
      throw error;
    }

    // Send confirmation email to subscriber
    try {
      await resend.emails.send({
        from: "Solenergy <info@solenergy.me>",
        to: email,
        subject: "Welcome to Solenergy Newsletter!",
        html: getNewsletterConfirmationEmail(),
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    // Send notification email to admin
    await resend.emails.send({
      from: "Solenergy Newsletter <info@solenergy.me>",
      to: "solenergysarl@gmail.com",
      subject: "New Newsletter Subscription",
      html: getNewsletterNotificationEmail(email),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
