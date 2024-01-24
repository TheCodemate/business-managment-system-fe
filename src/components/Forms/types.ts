import { z } from "zod";

const isValidPassword = (password: string) => {
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

export const resetPasswordFormSchema = z
  .object({
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

export const resetPasswordRequestFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "Invalid email format",
    }),
});

export type LoginFormInputsType = z.infer<typeof loginFormSchema>;
export type RegisterFromInputsType = z.infer<typeof registerFormSchema>;
export type ResetPasswordFormInputType = z.infer<
  typeof resetPasswordFormSchema
>;
export type ResetPasswordRequestFormInputType = z.infer<
  typeof resetPasswordRequestFormSchema
>;
export type FormInputsType = LoginFormInputsType | RegisterFromInputsType;
export type InputNames = string;
