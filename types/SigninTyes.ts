import zod from "zod";

export const feSignInInputs = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});


export type beSignInInputs=zod.infer<typeof feSignInInputs>