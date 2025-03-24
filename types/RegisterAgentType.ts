import zod from "zod";

export const feRegisterTravelAgentInputs = zod.object({
  businessName: zod
    .string()
    .min(2, { message: "Name must be atleast of 2 characters" }),
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
  location: zod
    .string()
    .min(2, { message: "Location name must be of atleast 2 characters" }),
  phoneNumber: zod
    .string() // Change to string to handle digit length properly
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),
});


export type beTravelAgentTypes=zod.infer<typeof feRegisterTravelAgentInputs>