import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormInputsType, loginFormSchema } from "./types";
import { useMember } from "../../../hooks/useMember";

export const LoginForm = () => {
  const { loginMutation } = useMember();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputsType>({ resolver: zodResolver(loginFormSchema) });

  const submit: SubmitHandler<LoginFormInputsType> = async (data) => {
    if (loginFormSchema.parse(data)) {
      loginMutation.login({
        email: data.email,
        password: data.password,
      });
    }
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <h2 className="text-3xl mb-9 text-left font-bold">Welcome back!</h2>
      <div>
        <p className="text-2xl mb-3 font-medium text-center">
          Login to your account
        </p>
        {loginMutation.error ? (
          <div className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg">
            {loginMutation.error.message}
          </div>
        ) : null}
        <form className={"flex flex-col"} onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col h-16">
            <label className="text-sm text-left" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              name="email"
              className="border-b border-black basis-full pl-4 bg-bgPrimary"
              type="email"
            />
          </div>
          <p className="text-xs text-redPrimary mb-2">
            {errors.email ? errors.email.message : ""}
          </p>

          <div className="flex flex-col h-16">
            <label className="text-sm text-left" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              name="password"
              className="border-b border-black basis-full pl-4 bg-bgPrimary"
              type="password"
            />
          </div>
          <p className="text-xs text-redPrimary mb-4">
            {errors.password ? errors.password.message : ""}
          </p>
          <a
            href="#"
            className="cursor-pointer text-xs text-right mb-7 text-purple-700 tracking-widest"
          >
            forget password?
          </a>
          <div className="px-4 mb-7 cursor-pointer">
            <button
              type="submit"
              className="text-white font-bold bg-primary text-textAlternate hover:cursor-pointer w-full p-2 rounded-lg"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Loading..." : "Login"}
            </button>
          </div>
          <a
            href="#"
            className="text-purple-700 font-bold text-center cursor-pointer"
          >
            create account
          </a>
        </form>
      </div>
    </div>
  );
};
