import zod, { string } from "zod";

export const dealTypes = zod.object({
  title: zod
    .string()
    .min(2, { message: "Title must be atleast of 2 character" }),
  description: zod
    .string()
    .min(2, { message: "Description must be atleast of 2 characters" }),
  price: zod.string().min(2, { message: "Price must be atleast of 2 digits" }),
  category: zod.string().min(2,{message:"Must constain atleat 2 characters"}),
  startDate: zod.date(),
  endDate: zod.date(), //YYYY-MM-DD
  spots: zod.string().min(1),
});
