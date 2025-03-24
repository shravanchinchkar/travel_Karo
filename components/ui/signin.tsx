"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastStyle } from "@/lib/toast-style";
import { feSignInInputs } from "@/types/SigninTyes";
import { LoadingUI } from "./loading-ui";

export const LoginUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const validateUserInput = feSignInInputs.safeParse(formData);

    if (!validateUserInput.success) {
      setInputError({
        emailError:
          validateUserInput.error.flatten().fieldErrors.email?.toString() || "",
        passwordError:
          validateUserInput.error.flatten().fieldErrors.password?.toString() ||
          "",
      });
    }
    else{
      setLoading(true);
      const res=await signIn("credentials",{
        email:formData.email,
        password:formData.password,
        redirect:false
      })
      console.log("SignIn Resposne:",res);
      setLoading(false);

      if (res?.error) {
        const errorResponse = JSON.parse(res.error) as {
          success: boolean;
          message?: string;
          error?: string;
          status?: string;
        };
        console.log("signin  error :", errorResponse);
        toast.error("Signin Failed", toastStyle);
      }
      else if (res?.ok) {
        // Check session to determine verification status
        const sessionResponse = await fetch("/api/auth/session");
        const session = await sessionResponse.json();
        console.log("session in signin:", session);
  
        if (session?.user?.isVerified) {
          console.log("Email already Verified signin successful!");
          toast.success("Signin successful!", toastStyle);
          router.push("/");
        } else {
          console.log("Email not verified, redirecting to verify!");
          router.push(`/verify?email=${formData.email}`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8 bg-white border-gray-400">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              {inputError.emailError ? (
                <div className="text-red-500">{inputError.emailError}</div>
              ) : null}
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setInputError({ ...inputError, emailError: "" });
                }}
                className="border-gray-400"
              />
            </div>
            <div>
              {inputError.passwordError ? (
                <div className="text-red-500">{inputError.passwordError}</div>
              ) : null}
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setInputError({ ...inputError, passwordError: "" });
                }}
                className="border-gray-400"
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-[1rem] items-center">
          {/* Following is the signin with credentials button */}
          <Button
            className="w-full text-white cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading?<LoadingUI/>:"Sign in"}
          </Button>

          {/* Following is the signin with google button */}
          {/* <button
            className="lg:w-[13rem] lg:h-[3rem] 2xl:w-[13rem] 2xl:h-[3.5rem] flex justify-evenly items-center bg-[#fff] border-[2px] border-[#8C8C8C] rounded-l-full rounded-r-full cursor-pointer"
            disabled={loading}
            onClick={async () => {
              console.log("click")
              try {
                console.log("Google hit!");
                setLoading(true);
                const result = await signIn("google", {
                  callbackUrl: "/",
                  redirect: false,
                });

                if (result?.error) {
                  toast.error(
                    result.error === "AccessDenied"
                      ? "Access denied. Please check your credentials."
                      : "Sign-in failed. Please try again.",
                    toastStyle
                  );
                } else if (result?.ok) {
                  setLoading(false);
                  toast.success("Sign-in Successful", toastStyle);
                  router.push("/");
                }
              } catch (error) {
                console.error("Sign-in error:", error);
                toast.error(
                  "An unexpected error occurred during sign-in",
                  toastStyle
                );
              }
            }}
          >
            <div className="lg:w-[1.5rem] lg:h-[1.5rem] 2xl:w-[1.80619rem] 2xl:h-[1.80619rem] relative">
              <Image
                src={"/assets/images/authImages/auth-Google.svg"}
                alt="google-auth"
                className="object-cover"
                fill
              />
            </div>
            <div className="text-[#1F1F1F] lg:text-[1rem] 2xl:text-[1rem] font-medium">
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
                "Sign in with Google"
              )}
            </div>
          </button> */}
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            Register now
          </Link>
        </div>
      </Card>
    </div>
  );
};
