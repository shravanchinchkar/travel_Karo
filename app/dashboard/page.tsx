"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Package,
  Users,
  Calendar,
  PlusCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link href="/dashboard/deals/create">
              <Button className="bg-black text-white cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Deal
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Active Deals</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Network Size</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Upcoming Deals</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-orange-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$24.5k</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Deals */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Deals</h2>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search Deals
                </Button>
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((deal) => (
                <Card key={deal} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        Summer Special: Bali Adventure Package
                      </h3>
                      <p className="text-sm text-gray-600">
                        7 days, 6 nights | Available until Aug 30
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$1,299</p>
                      <p className="text-sm text-green-600">12 spots left</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}