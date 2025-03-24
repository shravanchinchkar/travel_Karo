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
import { LoadingUI } from "./loading-ui";

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
      console.log("Registration Response:", res);
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
              Life is a journey
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
              {loading ? <LoadingUI /> : "Register"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};
