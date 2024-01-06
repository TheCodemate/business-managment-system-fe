import { z } from "zod";

const isValidPassword = (password: string) => {
  // Password should be at least 8 characters long
  // and contain at least 1 upper case letter, 1 lower case letter,
  // 1 number, and at least 1 special character.
  const passwordRegex =
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  return passwordRegex.test(password);
};

export const loginFormSchema = z.object({
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
});

export type LoginFormInputsType = z.infer<typeof loginFormSchema>;
