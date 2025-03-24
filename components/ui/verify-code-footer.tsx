"use client"

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { resendOTP } from "@/app/actions/auth";
import { toastStyle } from "@/lib/toast-style";
import { ResponseType } from "@/types/ResponseType";
import { formatCountdown } from "@/lib/format-count-down-time";

export const VerifyCodeFooter = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [disableResendMail, setdisableResendMail] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setdisableResendMail(false);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const handleResendOTP = async () => {
    setLoading(true);
    setdisableResendMail(true);
    const res: ResponseType = await resendOTP({ email });
    setTimeLeft(120);
    setLoading(false);
    if (res.error) {
      toast.error("resend failed", toastStyle);
    } else if (res.message === "User already verified") {
      toast.success("User already verified", toastStyle);
    } else {
      toast.success("Mail send!", toastStyle);
    }
  };
  const formattedTime = formatCountdown(timeLeft);

  return (
    <div className="flex items-center justify-between w-[29rem] rounded-[28px] mt-[2.5rem]">
      <div className="ml-[1rem]">{formattedTime}</div>

      <div className="w-[8rem] h-[2.5rem]">
        <button
          className={
            disableResendMail
              ? "w-[100%] h-[100%] leading-[29.44px] tracking-wider bg-blue-600 text-white rounded-full text-[1rem] font-normal shadow-lg border-[3px] text-center border-white uppercase cursor-not-allowed"
              : "w-[100%] h-[100%]  leading-[29.44px] tracking-wider bg-blue-600 text-white rounded-full transition-transform duration-300 ease-in-out hover:hover:bg-blue-700 hover:bg-none hover:font-bold text-[1rem] font-normal shadow-lg border-[3px] text-center border-white hover:border-none uppercase cursor-pointer"
          }
          disabled={disableResendMail}
          onClick={handleResendOTP}
        >
          {!loading ? "Resend" : "Loading..."}
        </button>
      </div>
    </div>
  );
};
