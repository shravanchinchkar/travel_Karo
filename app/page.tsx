import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Globe, Users } from "lucide-react";
import { NavBar } from "@/components/ui/nav-sestion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../lib/nextauth";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    return (
      <>
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-[2rem]">
          <NavBar />
          {/* Hero Section */}
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-7xl py-24 sm:py-32">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Connect, Share & Grow Your Travel Business
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Join the premier network for travel agents to share exclusive
                  deals, connect with service providers, and grow your business.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-[1.15rem]"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="sm:py-32 md:p-[2rem]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6 hover:shadow-lg transition-shadow border-gray-300">
                  <Plane className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Share Deals</h3>
                  <p className="text-gray-600">
                    Create and share exclusive travel deals with other agents
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow border-gray-300">
                  <Hotel className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Find Services</h3>
                  <p className="text-gray-600">
                    Connect with trusted service providers in the industry
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow border-gray-300">
                  <Globe className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                  <p className="text-gray-600">
                    Access a worldwide network of travel professionals
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow border-gray-300">
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                  <p className="text-gray-600">
                    Work together with other agents on package deals
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
