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

// Enhanced branded email template for newsletter subscription confirmation
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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); padding: 50px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
              <h1 style="margin: 0; color: #1f2937; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Welcome to Solenergy!</h1>
              <p style="margin: 15px 0 0 0; color: #1f2937; font-size: 18px; opacity: 0.9;">You're now part of the energy revolution</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 17px; line-height: 1.7;">
                Thank you for subscribing! You'll now receive exclusive updates on:
              </p>
              
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 30px 0;">
                <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 16px; line-height: 2;">
                  <li style="margin-bottom: 12px;">⚡ Solar energy solutions and innovations</li>
                  <li style="margin-bottom: 12px;">🔋 Energy management tips and best practices</li>
                  <li style="margin-bottom: 12px;">📊 Industry insights and market updates</li>
                  <li style="margin-bottom: 0;">🎁 Special offers and promotions</li>
                </ul>
              </div>

              <!-- Stats Banner -->
              <div style="background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                <div style="color: #1f2937; font-size: 14px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Why Choose Solenergy?</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding: 10px;">
                      <div style="font-size: 28px; font-weight: 800; color: #1f2937;">30+</div>
                      <div style="font-size: 12px; color: #1f2937; opacity: 0.8; margin-top: 5px;">Years Experience</div>
                    </td>
                    <td align="center" style="padding: 10px;">
                      <div style="font-size: 28px; font-weight: 800; color: #1f2937;">50+ MW</div>
                      <div style="font-size: 12px; color: #1f2937; opacity: 0.8; margin-top: 5px;">Installed</div>
                    </td>
                    <td align="center" style="padding: 10px;">
                      <div style="font-size: 28px; font-weight: 800; color: #1f2937;">24/7</div>
                      <div style="font-size: 12px; color: #1f2937; opacity: 0.8; margin-top: 5px;">Support</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="https://solenergypower.com/portfolio" style="display: inline-block; background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); color: #1f2937; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(244, 180, 26, 0.3);">View Our Projects →</a>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 15px 0 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="https://solenergypower.com/solutions" style="display: inline-block; background-color: #1f2937; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">Explore Solutions →</a>
                  </td>
                </tr>
              </table>

              <!-- Promise -->
              <div style="background-color: #f9fafb; border-left: 4px solid #F4B41A; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1f2937;">✨ Our Promise:</strong> We'll keep our emails valuable, relevant, and spam-free. You can unsubscribe anytime.
                </p>
              </div>

              <!-- Social Links -->
              <div style="text-align: center; padding: 25px 0; border-top: 1px solid #e5e7eb; margin-top: 30px;">
                <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">Follow us for daily updates:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding: 5px;">
                      <a href="https://www.instagram.com/solenergy.me" style="color: #E4405F; text-decoration: none; font-weight: 600; font-size: 14px;">📷 Instagram</a>
                    </td>
                    <td align="center" style="padding: 5px;">
                      <a href="https://www.facebook.com/solenergylebanon" style="color: #1877F2; text-decoration: none; font-weight: 600; font-size: 14px;">👥 Facebook</a>
                    </td>
                    <td align="center" style="padding: 5px;">
                      <a href="https://www.linkedin.com/company/solenergy-sarl" style="color: #0A66C2; text-decoration: none; font-weight: 600; font-size: 14px;">💼 LinkedIn</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 13px;">
                <strong style="color: #F4B41A;">LB:</strong> Galaxy Mall, Baabda, Mount Lebanon • <strong style="color: #F4B41A;">QR:</strong> Doha, Qatar
              </p>
              <p style="margin: 10px 0; color: #9ca3af; font-size: 13px;">
                © ${new Date().getFullYear()} Solenergy. All rights reserved.
              </p>
              <div style="margin-top: 20px;">
                <a href="https://solenergypower.com" style="color: #F4B41A; text-decoration: none; font-weight: 600; font-size: 14px;">Visit Our Website →</a>
              </div>
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

// Enhanced branded email template for newsletter subscription notification to admin
function getNewsletterNotificationEmail(email: string, name?: string, phone?: string) {
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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 15px;">📬</div>
              <h1 style="margin: 0; color: #1f2937; font-size: 28px; font-weight: 700;">New Newsletter Subscription</h1>
              <p style="margin: 10px 0 0 0; color: #1f2937; font-size: 16px; opacity: 0.9;">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 700;">👤 Subscriber Information</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; width: 140px;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${email}" style="color: #F4B41A; text-decoration: none; font-size: 16px; font-weight: 600;">${email}</a>
                    </td>
                  </tr>
                  ${name ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Name:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${name}</td>
                  </tr>
                  ` : ''}
                  ${phone ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0;">
                      <a href="tel:${phone.replace(/\s/g, '')}" style="color: #1f2937; text-decoration: none; font-size: 16px;">${phone}</a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="mailto:${email}?subject=Welcome to Solenergy Newsletter" style="display: inline-block; background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); color: #1f2937; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(244, 180, 26, 0.3);">Send Welcome Email →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 13px;">
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

    // Prepare data for Supabase - only include fields that exist in the schema
    const insertData: any = {
      organization_id: SOLENERGY_ORG_ID,
      email: email,
      status: 'active',
    };

    // Only add optional fields if they exist
    if (name) insertData.name = name;
    if (phone) insertData.phone = phone;

    // Save to Supabase using BDI Systems schema with upsert to handle duplicates
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        insertData,
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
      const confirmResult = await resend.emails.send({
        from: "Solenergy <info@solenergypower.com>",
        to: email,
        subject: "🎉 Welcome to Solenergy Newsletter!",
        html: getNewsletterConfirmationEmail(),
      });
      if (confirmResult.error) {
        console.error("❌ Newsletter confirmation email failed:", confirmResult.error);
        console.error("Error details:", {
          statusCode: confirmResult.error.statusCode,
          name: confirmResult.error.name,
          message: confirmResult.error.message,
        });
      } else {
        console.log("✅ Newsletter confirmation email sent successfully:", confirmResult.data?.id);
      }
    } catch (emailErr: any) {
      console.error("❌ Failed to send newsletter confirmation email:", emailErr);
      console.error("Error details:", {
        message: emailErr?.message,
        name: emailErr?.name,
        statusCode: emailErr?.response?.status,
        body: emailErr?.response?.body,
      });
    }

    // Send notification email to admin
    try {
      const adminResult = await resend.emails.send({
        from: "Solenergy Newsletter <info@solenergypower.com>",
        to: "info@solenergypower.com",
        subject: `📬 New Newsletter Subscription: ${email}`,
        html: getNewsletterNotificationEmail(email, name, phone),
      });
      if (adminResult.error) {
        console.error("❌ Admin newsletter notification failed:", adminResult.error);
        console.error("Error details:", {
          statusCode: adminResult.error.statusCode,
          name: adminResult.error.name,
          message: adminResult.error.message,
        });
      } else {
        console.log("✅ Admin newsletter notification sent successfully:", adminResult.data?.id);
      }
    } catch (adminEmailErr: any) {
      console.error("❌ Failed to send admin newsletter notification:", adminEmailErr);
      console.error("Error details:", {
        message: adminEmailErr?.message,
        name: adminEmailErr?.name,
        statusCode: adminEmailErr?.response?.status,
        body: adminEmailErr?.response?.body,
    });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
