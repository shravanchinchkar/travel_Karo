"use server";

import client from "@/db";
import bcrypt from "bcrypt";
import { ResponseType } from "@/types/ResponseType";
import { getExpiryDate } from "@/lib/generate-expiry-date";
import { beTravelAgentTypes } from "@/types/RegisterAgentType";
import { generateVerifyCode } from "@/lib/generate-verify-code";
import { sendVerificationEmail } from "@/resend/sendVerificationEmail";

interface VerifyCodeProps {
  email?: string;
  userVerifyCode: string;
}

//Register the Travel Agent
export async function registerTravelAgent(
  travelAgentDetails: beTravelAgentTypes
): Promise<ResponseType> {
  try {
    const existingTravelAgent = await client.travelAgent.findUnique({
      where: {
        email: travelAgentDetails.email,
      },
    });

    const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
    const expiryDate = getExpiryDate();

    //If the trvel agent already exists then evaluate the travel agent  as follows:
    if (existingTravelAgent) {
      //If the user already exists and is verified
      if (existingTravelAgent.isVerified) {
        console.error("Email already in use", existingTravelAgent);
        return { success: false, error: "Email already in use" };
      }
      //If the travel agent already exists but is not verified
      else {
        console.log("Email exists but not verified!", existingTravelAgent);
        const hashPassword = await bcrypt.hash(travelAgentDetails.password, 10);
        await client.travelAgent.update({
          where: { email: travelAgentDetails.email },
          data: {
            password: hashPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
          },
        });

        // Send verification email for the unverified user
        const emailResponse = await sendVerificationEmail(
          travelAgentDetails.businessName,
          travelAgentDetails.email,
          verifyCode
        );

        // If error while sending email
        if (!emailResponse.success) {
          console.log("email not send message:", emailResponse.message);
          return { success: false, message: emailResponse.message };
        }

        console.log("email success message:", emailResponse);
        // If success in sending email
        return {
          success: true,
          message: "User updated successfully. Please verify your email",
        };
      }
    } else {
      // If the travelagent doesn't exists create the new fresh user
      const hashPassword = await bcrypt.hash(travelAgentDetails.password, 10);
      const newTravelAgent = await client.travelAgent.create({
        data: {
          businessName: travelAgentDetails.businessName,
          email: travelAgentDetails.email,
          password: hashPassword,
          location: travelAgentDetails.location,
          phoneNumber: travelAgentDetails.phoneNumber,
          verifyCode: verifyCode,
          verifyCodeExpiry: expiryDate,
        },
      });

      // If new fresh user can't be created then
      if (!newTravelAgent) {
        console.error("Please try again! Can't create the account");
        return {
          success: false,
          message: "Please try again! Can't create the account",
        };
      }

      console.log("New TravelAgent Created", newTravelAgent);

      // If the new fresh user is created, then send an otp to the user's email to verify
      const emailResponse = await sendVerificationEmail(
        newTravelAgent.businessName,
        newTravelAgent.email,
        verifyCode
      );
      // If error while sending email
      if (!emailResponse.success) {
        console.log(
          "new TravelAgent created email not send message:",
          emailResponse.message
        );
        return { success: false, message: emailResponse.message };
      }
      // If success in sending email
      console.log(
        "new TravelAgent created email send message:",
        emailResponse.message
      );
      return {
        success: true,
        message:
          "TravelAgent registered successfully. Please verify your email",
      };
    }
  } catch (error) {
    console.error("error while registering the agent", error);
    return { success: false, error: "Error while registering the agent" };
  }
}

// Following is the server action to verify the otp entered by the user
export async function verifyCode({
  email,
  userVerifyCode
}: VerifyCodeProps): Promise<ResponseType> {
  try {
    const existingTravelAgent = await client.travelAgent.findUnique({
      where: {
        email: email,
      },
    });
    console.log("Verify Code user exists", existingTravelAgent);

    // If the email dose not exists then
    if (!existingTravelAgent) {
      console.error("verify user not found!");
      return { success: false, error: "User not found!",status:400};
    }

    const currentTime = new Date();
    if (
      !existingTravelAgent.verifyCode ||
      !existingTravelAgent.verifyCodeExpiry ||
      existingTravelAgent.verifyCode !== userVerifyCode ||
      currentTime > existingTravelAgent.verifyCodeExpiry
    ) {
      console.error("Invalid OTP");
      return { success: false, error: "Invalid or expired OTP" };
    }

    const updateSeller = await client.travelAgent.update({
      where: { email: email },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });

    if (!updateSeller) {
      console.error("Error While Updating Verified seller");
      return { success: false, error: "Error While Updating Verified seller" };
    }
    return { success: true, message: "Email verified successfully" };
  } catch (err) {
    console.error("Error verifying end-user otp");
    return {
      success: false,
      error: "Error verifying end-user otp",
      status: 500,
    };
  }
}

// Resend the OTP
export async function resendOTP({
  email,
}: {
  email: string;
}): Promise<ResponseType> {
  try {
    //Get the requested user from db
    const user = await client.travelAgent.findFirst({
      where: { email: email },
    });

    // If user not found
    if (!user) {
      return { success: false, error: "User not found" };
    }
    //If user is already Verified
    if (user.isVerified) {
      return { success: false, message: "User already verified" };
    }

    // Generate new OTP and new expiry time
    const newOTP = generateVerifyCode();
    const expiryDate = getExpiryDate();

    // Upadate the user with newOTP and new expiryDate
    await client.travelAgent.update({
      where: { email: email },
      data: {
        verifyCode: newOTP,
        verifyCodeExpiry: expiryDate,
      },
    });

    //Resend the OTP to the which is to be verified
    const emailResponse = await sendVerificationEmail(
      user.businessName,
      user.email,
      newOTP
    );

    // If fail to send mail
    if (!emailResponse.success) {
      console.log("resend email not send message:", emailResponse.message);
      return { success: false, error: emailResponse.message };
    }
    // If success in send mail
    console.log("resend email send message:", emailResponse.message);
    return {
      success: true,
      message: "New OTP sent successfully. Please verify your email",
    };
  } catch (error) {
    console.error("Error while resending OTP", error);
    return { success: false, message: "Not able to resend otp" };
  }
}
