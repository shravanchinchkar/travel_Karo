"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toastStyle } from "@/lib/toast-style";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResponseType } from "@/types/ResponseType";
import { registerTravelAgent } from "@/app/actions/auth";
import { feRegisterTravelAgentInputs } from "@/types/RegisterAgentType";

export const RegisterUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    location: "",
    phoneNumber: "",
  });
  const [inputError, setInputError] = useState({
    businessNameError: "",
    emailError: "",
    passwordError: "",
    locationError: "",
    phoneNumberError: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validateUserInput = feRegisterTravelAgentInputs.safeParse(formData);
    // If Input is invalid the 
    if (!validateUserInput.success) {
      console.log(
        "Invalid Inputs",
        validateUserInput.error.flatten().fieldErrors
      );
      setInputError({
        businessNameError:
          validateUserInput.error
            .flatten()
            .fieldErrors.businessName?.toString() || "",
        emailError:
          validateUserInput.error.flatten().fieldErrors.email?.toString() || "",
        passwordError:
          validateUserInput.error.flatten().fieldErrors.password?.toString() ||
          "",
        locationError:
          validateUserInput.error.flatten().fieldErrors.location?.toString() ||
          "",
        phoneNumberError:
          validateUserInput.error
            .flatten()
            .fieldErrors.phoneNumber?.toString() || "",
      });
    } else {
      setLoading(true);
      const res: ResponseType = await registerTravelAgent(formData);
      console.log("Registration Response:",res);
      setLoading(false);
      if (res.error) {
        toast.error(res.error, toastStyle);
      } else {
        router.push(`/verify?email=${formData.email}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8 bg-white border-gray-400">
        <div className="flex flex-col items-center">
          <Link
            className="flex flex-col items-center gap-0 leading-[40px]"
            href="/"
          >
            <h1 className="text-[3rem] font-bold">Travel Karo</h1>
            <h2 className="text-lg  text-gray-600 ml-[0.5rem]">
              File is a journey
            </h2>
          </Link>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register your travel agency
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              {inputError.businessNameError ? (
                <div className="text-red-500">
                  {inputError.businessNameError}
                </div>
              ) : null}
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => {
                  setFormData({ ...formData, businessName: e.target.value });
                  setInputError({ ...inputError, businessNameError: "" });
                }}
                className="border-gray-400"
              />
            </div>
            <div>
              {inputError.emailError ? (
                <div className="text-red-500">{inputError.emailError}</div>
              ) : null}
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
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
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setInputError({ ...inputError, passwordError: "" });
                }}
                className="border-gray-400"
              />
            </div>
            <div>
              {inputError.locationError ? (
                <div className="text-red-500">{inputError.locationError}</div>
              ) : null}
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setInputError({ ...inputError, locationError: "" });
                }}
                className="border-gray-400"
              />
            </div>
            <div>
              {inputError.phoneNumberError ? (
                <div className="text-red-500">
                  {inputError.phoneNumberError}
                </div>
              ) : null}
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                  setInputError({ ...inputError, phoneNumberError: "" });
                }}
                className="border-gray-400"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${loading === true ? "cursor-not-allowed" : "cursor-pointer"}`}
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
                "Register"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};
