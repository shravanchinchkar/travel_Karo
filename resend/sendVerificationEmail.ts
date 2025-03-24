import { v4 as uuidv4 } from "uuid";
import { resend } from "../lib/resend";
import { ResponseTpye } from "@/types/ResponseType";
import TravelKaroVerifyEmailTemplate from "@/emails/verify-email-template";

export async function sendVerificationEmail(
  name: string,
  email: string,
  verifyCode: string
): Promise<ResponseTpye> {
  try {
    const { data, error } = await resend.emails.send({
      from: "TravelKaro Support <support@travelkaro.shravanchinchkar.me>",
      to: email,
      subject: "Your TravelKaro Verification Code",
      react: TravelKaroVerifyEmailTemplate({ name,email, verifyCode }),
      text: `Hello ${name},Thank you for registering with TravelKaro. To complete your account setup, please verify your email address using this verification code: ${verifyCode}
      This code is valid for 2 minutes.
      Best Regards,
      TravelKaro Team
      https://travelkaro.shravanchinchkar.me`,
      headers: {
        "X-Entity-Ref-ID": uuidv4(),
      },
      tags: [
        {
          name: "category",
          value: "verification",
        },
      ],
    });

    if (error) {
      console.error("Resend API Error:", {
        errorMessage: error.message,
        // errorCode: error.statusCode,
        timestamp: new Date().toISOString(),
      });
      return {
        success: false,
        message: `Failed to send email: ${error.message}`,
      };
    }
    console.log("Email sent successfully:", {
      messageId: data?.id,
      recipient: email,
      timestamp: new Date().toISOString(),
    });
    return { success: true, message: "Verification mail Send Successfully" };
  } catch (emailError) {
    console.error("Error Sending Verification Email!", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
