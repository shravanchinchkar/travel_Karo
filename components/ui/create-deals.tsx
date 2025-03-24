"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { dealTypes } from "@/types/DealTypes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateDeals = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    startDate: "",
    endDate: "",
    spots: "",
  });
  const [inputError, setInputError] = useState({
    titleError: "",
    descriptionError: "",
    priceError: "",
    categoryError: "",
    startDateError: "",
    endDateError: "",
    spotsError: "",
  });

  const handleSubmitDeal = async () => {
    console.log("Form Data is:", formData);
    const validateInput = dealTypes.safeParse(formData);
    if (!validateInput.success) {
      setInputError({
        titleError:
          validateInput.error.flatten().fieldErrors.title?.toString() || "",
        descriptionError:
          validateInput.error.flatten().fieldErrors.description?.toString() ||
          "",
        priceError:
          validateInput.error.flatten().fieldErrors.price?.toString() || "",
        categoryError:
          validateInput.error.flatten().fieldErrors.category?.toString() || "",
        startDateError:
          validateInput.error.flatten().fieldErrors.startDate?.toString() || "",
        endDateError:
          validateInput.error.flatten().fieldErrors.endDate?.toString() || "",
        spotsError:
          validateInput.error.flatten().fieldErrors.spots?.toString() || "",
      });
    } else {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 bg-white">
          <h1 className="text-2xl font-bold mb-8">Create New Deal</h1>

          <form className="space-y-6">
            <div>
              {inputError.titleError ? (
                <div className="text-red-500">{inputError.titleError}</div>
              ) : null}
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
              {inputError.descriptionError ? (
                <div className="text-red-500">
                  {inputError.descriptionError}
                </div>
              ) : null}
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
                {inputError.priceError ? (
                  <div className="text-red-500">{inputError.priceError}</div>
                ) : null}
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
                {inputError.categoryError ? (
                  <div className="text-red-500">{inputError.categoryError}</div>
                ) : null}
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
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="flight"
                      className="hover:bg-blue-500 cursor-pointer hover:text-white"
                    >
                      Flight
                    </SelectItem>
                    <SelectItem
                      value="hotel"
                      className="hover:bg-blue-500 cursor-pointer hover:text-white"
                    >
                      Hotel
                    </SelectItem>
                    <SelectItem
                      value="package"
                      className="hover:bg-blue-500 cursor-pointer hover:text-white"
                    >
                      Package
                    </SelectItem>
                    <SelectItem
                      value="activity"
                      className="hover:bg-blue-500 cursor-pointer hover:text-white"
                    >
                      Activity
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
              {inputError.startDateError ? (
                <div className="text-red-500">{inputError.startDateError}</div>
              ) : null}
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
                {inputError.endDateError ? (
                  <div className="text-red-500">{inputError.endDateError}</div>
                ) : null}
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
              {inputError.spotsError ? (
                <div className="text-red-500">{inputError.spotsError}</div>
              ) : null}
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

            <Button
              onClick={handleSubmitDeal}
              className="w-full bg-blue-600 text-white"
            >
              Create Deal
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
