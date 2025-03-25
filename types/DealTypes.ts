import zod, { string } from "zod";

export const dealTypes = zod.object({
  title: zod
    .string()
    .min(2, { message: "Title must be atleast of 2 character" }),
  description: zod
    .string()
    .min(2, { message: "Description must be atleast of 2 characters" }),
  price: zod.string().min(2, { message: "Price must be atleast of 2 digits" }),
  category: zod
    .string()
    .min(2, { message: "Must constain atleat 2 characters" }),
  startDate: zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Start date must be in YYYY-MM-DD format",
    })
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .refine((val) => new Date(val) >= new Date(), {
      message: "Start date must be today or in the future",
    }),
  endDate: zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "End date must be in YYYY-MM-DD format",
    })
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  spots: zod.string().min(1),
});
