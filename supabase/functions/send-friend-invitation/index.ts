import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FriendInvitationRequest {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  message?: string;
  inviteUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Friend invitation request received");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { senderName, senderEmail, recipientEmail, message, inviteUrl }: FriendInvitationRequest = await req.json();

    console.log("Sending invitation from:", senderEmail, "to:", recipientEmail);

    const emailResponse = await resend.emails.send({
      from: "Game Invitation <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `${senderName} מזמין אותך למשחק מילים!`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px; font-size: 28px;">
              🎮 הזמנה למשחק מילים
            </h1>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <p style="font-size: 18px; margin: 0; color: #1e293b;">
                שלום! <strong>${senderName}</strong> מזמין אותך להצטרף למשחק מילים מרגש!
              </p>
            </div>

            ${message ? `
              <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-right: 4px solid #10b981;">
                <p style="margin: 0; color: #064e3b; font-style: italic;">
                  "${message}"
                </p>
              </div>
            ` : ''}

            <div style="text-align: center; margin: 30px 0;">
              <a href="${inviteUrl}" 
                 style="background: linear-gradient(135deg, #2563eb, #3b82f6); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-size: 18px; 
                        font-weight: bold; 
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);">
                הצטרף למשחק 🚀
              </a>
            </div>

            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 0; color: #64748b; font-size: 14px; text-align: center;">
                אם אינך יכול לחשב על הכפתור, העתק והדבק את הקישור הזה לדפדפן שלך:
              </p>
              <p style="margin: 10px 0 0 0; color: #2563eb; font-size: 14px; text-align: center; word-break: break-all;">
                ${inviteUrl}
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                קיבלת את האימייל הזה כי ${senderEmail} הזמין אותך למשחק. 
                אם אינך מכיר את השולח, ניתן להתעלם מהאימייל הזה.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, messageId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending friend invitation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);