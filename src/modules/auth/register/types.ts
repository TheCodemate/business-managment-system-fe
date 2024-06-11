import { isValidPassword } from "@/utils/isValidPassword";
import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: "Invalid email format",
      }),
    password: z
      .string({ required_error: "Password is required" })
      .refine((password) => password.length >= 8, {
        message: "Password has to be at least 8 characters long.",
      })
      .refine((password) => isValidPassword(password), {
        message:
          "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special character.",
      }),
    confirmPassword: z.string({
      required_error: "You have to confirm password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFromInputsType = z.infer<typeof registerFormSchema>;
export type FormInputsType = RegisterFromInputsType;
