import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { promises } from "dns";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@nohardfellingfeedback.xyz",
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "successfully send verification code email ",
    };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification code email ",
    };
  }
}
