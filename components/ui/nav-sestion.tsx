"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { toastStyle } from "@/lib/toast-style";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export const NavBar = () => {
  const router = useRouter();
  const session = useSession();

  function handleSignIn() {
    console.log("Hello signin!");
    router.push("/signin")
  }

  async function handleSignOut() {
    console.log("Signed Out Called!");
    await signOut();
    toast.success("Signed Out!", toastStyle);
  }

  return (
    <nav className="flex justify-between items-center mx-[9rem]">
      <Link className="flex flex-col items-start gap-0 leading-[40px]" href="/">
        <h1 className="text-[3rem] font-bold text-gray-900">Travel Karo</h1>
        <h2 className="text-lg  text-gray-600 ml-[0.5rem]">
          Life is a journey
        </h2>
      </Link>

      <Link href="/signin">
        <Button
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          variant="outline"
          size="lg"
          onClick={
            session.status === "authenticated" ? handleSignOut : handleSignIn
          }
        >
          {session.status === "authenticated" ? "Sign Out" : "Sign In"}
        </Button>
      </Link>
    </nav>
  );
};
