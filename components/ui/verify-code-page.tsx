"use client"

import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { toastStyle } from "@/lib/toast-style";
import { verifyCode } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { ResponseType } from "@/types/ResponseType";
import { VerifyCodeFooter } from "./verify-code-footer";

export const VerifyCodePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [loading, setLoading] = useState(false);
  const [userVerifyCode, setUserVerifyCode] = useState("");

  let toastId:string;

  useEffect(() => {
    toastId = toast.loading("Verify Your Email", toastStyle);
    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  const handelVerifyCode = async () => {
    setLoading(true);
    const res: ResponseType = await verifyCode({ email, userVerifyCode });
    console.log("verify code response to FE", res);
    setLoading(false);
    if (res.error) {
      if (res.error === "User not found!") {
        toast.error("Invalid User!", toastStyle);
      } else if (res.error === "Invalid or expired OTP") {
        toast.error("Invalid or expired OTP", toastStyle);
      } else if (
        res.error === "Error verifying user" ||
        res.error === "Error While Updating Verified User"
      ) {
        toast.error("Error verifying user", toastStyle);
      }
    } else {
      toast.success("Email verified!", toastStyle);
      router.push("/");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white w-screen h-screen flex justify-center items-center">
      <div className="w-[30rem] h-[30rem] rounded-[28px] border-[2px] border-gray-400 shadow-md flex flex-col gap-[2rem] items-center pt-[1rem] bg-white">
        <div className="flex justify-center">
          <Link
            className="flex flex-col items-center gap-0 leading-[40px]"
            href="/"
          >
            <h1 className="text-[3rem] font-bold text-gray-900">Travel Karo</h1>
            <h2 className="text-lg  text-gray-600 ml-[0.5rem]">
              Life is a journey
            </h2>
          </Link>
        </div>
        <div className="text-gray-900 flex flex-col items-center gap-[0.5rem]">
          <h1 className="text-3xl font-bold ">We need to verify you</h1>
          <div className="flex flex-col items-center">
            <p className="w-[100%] text-center text-sm">
              Enter the code TravelKaro send to
            </p>
            <p className="font-semibold">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[0.3rem] items-center text-gray-900">
          <p className="font-medium">Enter Your OTP:</p>
          <input
            className="lg:w-[11rem] xl:w-[17.3125rem] h-[1.8125rem] border-[2px] border-gray-400 text-center outline-none lg:text-[1rem] xl:text-[1.1rem] px-[2rem] py-[1.5rem] rounded-[28px] text-[#123524] text-3xl"
            type="text"
            value={userVerifyCode}
            onChange={(e) => {
              setUserVerifyCode(e.target.value);
            }}
          />
          <div className="w-[15rem] h-[3rem] mt-[0.5rem]">
            <button
              type="button"
              className={
                loading
                  ? "w-[100%] h-[100%] leading-[29.44px] tracking-wider bg-blue-600 text-white rounded-full text-[1rem] font-normal shadow-lg border-[3px] text-center border-white uppercase cursor-not-allowed"
                  : "w-[100%] h-[100%]  leading-[29.44px] tracking-wider bg-blue-600 text-white rounded-full transition-transform duration-300 ease-in-out hover:hover:bg-blue-700 hover:bg-none hover:font-bold text-[1rem] font-normal shadow-lg border-[3px] text-center border-white hover:border-none uppercase cursor-pointer"
              }
              onClick={handelVerifyCode}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-5 h-5 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
          <VerifyCodeFooter email={email} />
        </div>
      </div>
    </div>
  );
};
