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

// Enhanced branded email template for contact form confirmation to user
function getContactConfirmationEmail(form: any) {
  const name = form.name || "Valued Customer";
  const message = form.message || "No message provided";
  const solutions = form.solutions ? (Array.isArray(form.solutions) ? form.solutions : [form.solutions]) : [];
  const property = form.property || "Not specified";
  
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
              <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
              <h1 style="margin: 0; color: #1f2937; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Thank You, ${name}!</h1>
              <p style="margin: 15px 0 0 0; color: #1f2937; font-size: 18px; opacity: 0.9;">We've received your message</p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 17px; line-height: 1.7;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 17px; line-height: 1.7;">
                Thank you for reaching out to Solenergy! We've received your inquiry and our team will get back to you within 24 hours.
              </p>

              <!-- Your Message Preview Card -->
              <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-left: 4px solid #F4B41A; border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 700;">📋 Your Message</h2>
                
                ${form.reason ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Reason for Contact</strong>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${form.reason}</p>
                </div>
                ` : ''}
                
                ${form.property ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Property Type</strong>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${form.property}</p>
                </div>
                ` : ''}
                
                ${solutions.length > 0 ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Solutions Interested In</strong>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${solutions.join(', ')}</p>
                </div>
                ` : ''}
                
                ${form.budget ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Budget Range</strong>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${form.budget}</p>
                </div>
                ` : ''}
                
                ${form.message ? `
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</strong>
                  <div style="margin-top: 10px; padding: 15px; background-color: #ffffff; border-radius: 8px; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${form.message}</div>
                </div>
                ` : ''}
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

              <!-- Next Steps -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 700;">📞 What Happens Next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">Our energy experts will review your inquiry</li>
                  <li style="margin-bottom: 10px;">We'll contact you via ${form.contact_pref || 'your preferred method'} within 24 hours</li>
                  <li style="margin-bottom: 10px;">We'll schedule a consultation to discuss your energy needs</li>
                  <li>You'll receive a customized solution proposal</li>
                </ol>
              </div>

              <!-- Contact Info -->
              <div style="text-align: center; padding: 25px 0; border-top: 1px solid #e5e7eb; margin-top: 30px;">
                <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">Need immediate assistance?</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding: 5px;">
                      <a href="tel:+96171654956" style="color: #F4B41A; text-decoration: none; font-weight: 600; font-size: 16px;">📞 +961 71 654 956</a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 5px;">
                      <a href="https://wa.me/96171654956" style="color: #25D366; text-decoration: none; font-weight: 600; font-size: 16px;">💬 WhatsApp</a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 5px;">
                      <a href="mailto:info@solenergypower.com" style="color: #F4B41A; text-decoration: none; font-weight: 600; font-size: 16px;">✉️ info@solenergypower.com</a>
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

// Enhanced branded email template for contact form notification to admin
function getContactNotificationEmail(form: any) {
  const solutions = form.solutions ? (Array.isArray(form.solutions) ? form.solutions : [form.solutions]) : [];
  
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
              <div style="font-size: 48px; margin-bottom: 15px;">🔔</div>
              <h1 style="margin: 0; color: #1f2937; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; color: #1f2937; font-size: 16px; opacity: 0.9;">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 700;">👤 Contact Information</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; width: 140px;">Name:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${form.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${form.email}" style="color: #F4B41A; text-decoration: none; font-size: 16px; font-weight: 600;">${form.email}</a>
                    </td>
                  </tr>
                  ${form.phone ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0;">
                      <a href="tel:${form.phone.replace(/\s/g, '')}" style="color: #1f2937; text-decoration: none; font-size: 16px;">${form.phone}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${form.city ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">City:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 16px;">${form.city}</td>
                  </tr>
                  ` : ''}
                  ${form.contact_pref ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Contact Preference:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 16px;">${form.contact_pref}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              ${form.reason ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px; font-weight: 700;">🎯 Reason for Contact</h3>
                <p style="margin: 0; color: #374151; font-size: 16px;">${form.reason}</p>
              </div>
              ` : ''}

              ${form.property ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px; font-weight: 700;">🏢 Property Type</h3>
                <p style="margin: 0; color: #374151; font-size: 16px;">${form.property}</p>
              </div>
              ` : ''}

              ${solutions.length > 0 ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 700;">⚡ Solutions Interested In</h3>
                ${solutions.map((sol: string) => `
                  <div style="display: inline-block; background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); color: #1f2937; padding: 8px 16px; border-radius: 8px; margin: 5px 5px 5px 0; font-weight: 600; font-size: 14px;">${sol}</div>
                `).join('')}
              </div>
              ` : ''}

              ${form.budget ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px; font-weight: 700;">💰 Budget Range</h3>
                <p style="margin: 0; color: #374151; font-size: 20px; font-weight: 700;">${form.budget}</p>
              </div>
              ` : ''}

              ${form.message ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 700;">💬 Message</h3>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #F4B41A; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${form.message}</div>
              </div>
              ` : ''}

              <!-- Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="mailto:${form.email}?subject=Re: Your inquiry to Solenergy" style="display: inline-block; background: linear-gradient(135deg, #F4B41A 0%, #E8952F 100%); color: #1f2937; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(244, 180, 26, 0.3);">Reply via Email →</a>
                  </td>
                </tr>
              </table>
              ${form.phone ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 15px 0 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="tel:${form.phone.replace(/\s/g, '')}" style="display: inline-block; background-color: #1f2937; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">Call ${form.name || 'Customer'} →</a>
                  </td>
                </tr>
              </table>
              ` : ''}
              ${form.phone ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 15px 0 35px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="https://wa.me/${form.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">WhatsApp ${form.name || 'Customer'} →</a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 13px;">
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
      const confirmResult = await resend.emails.send({
        from: "Solenergy <info@solenergypower.com>",
        to: form.email,
        subject: "Thank You for Contacting Solenergy! 🌟",
        html: getContactConfirmationEmail(form),
      });
      if (confirmResult.error) {
        console.error("❌ User confirmation email failed:", confirmResult.error);
        console.error("Error details:", {
          statusCode: confirmResult.error.statusCode,
          name: confirmResult.error.name,
          message: confirmResult.error.message,
        });
      } else {
        console.log("✅ User confirmation email sent successfully:", confirmResult.data?.id);
      }
    } catch (emailErr: any) {
      console.error("❌ Failed to send confirmation email:", emailErr);
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
        from: "Solenergy Contact <info@solenergypower.com>",
        to: "info@solenergypower.com",
        subject: `🔔 New Contact: ${form.name} - ${form.reason || 'General Inquiry'}`,
        html: getContactNotificationEmail(form),
      });
      if (adminResult.error) {
        console.error("❌ Admin notification email failed:", adminResult.error);
        console.error("Error details:", {
          statusCode: adminResult.error.statusCode,
          name: adminResult.error.name,
          message: adminResult.error.message,
    });
      } else {
        console.log("✅ Admin notification email sent successfully:", adminResult.data?.id);
      }
    } catch (adminEmailErr: any) {
      console.error("❌ Failed to send admin notification email:", adminEmailErr);
      console.error("Error details:", {
        message: adminEmailErr?.message,
        name: adminEmailErr?.name,
        statusCode: adminEmailErr?.response?.status,
        body: adminEmailErr?.response?.body,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Failed to send" }, { status: 500 });
  }
}
