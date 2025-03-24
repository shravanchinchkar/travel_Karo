"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { supabase } from "@/lib/supabase";

export const CreateDeals=()=>{
  // const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    startDate: "",
    endDate: "",
    spots: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();

    //   if (!user) {
    //     throw new Error("Not authenticated");
    //   }

    //   const { error } = await supabase.from("deals").insert({
    //     title: formData.title,
    //     description: formData.description,
    //     price: parseFloat(formData.price),
    //     category: formData.category,
    //     start_date: formData.startDate,
    //     end_date: formData.endDate,
    //     spots_available: parseInt(formData.spots),
    //     created_by: user.id,
    //   });

    //   if (error) throw error;

    //   router.push("/dashboard");
    // } catch (error) {
    //   console.error("Error creating deal:", error);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-8">Create New Deal</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Deal Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="package">Package</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="spots">Available Spots</Label>
              <Input
                id="spots"
                type="number"
                value={formData.spots}
                onChange={(e) =>
                  setFormData({ ...formData, spots: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Deal
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
