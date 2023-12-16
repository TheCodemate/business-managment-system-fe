import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password has to be at least 8 chars long." }),
});

export type LoginFormInputsType = z.infer<typeof loginFormSchema>;
1;
