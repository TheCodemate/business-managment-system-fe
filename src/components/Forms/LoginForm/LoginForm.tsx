import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormInputsType, loginFormSchema } from "./types";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LoginFormInputsType>({ resolver: zodResolver(loginFormSchema) });

  const watchFields = watch(["email", "password"]); // you can also target specific fields by their names

  const submit: SubmitHandler<LoginFormInputsType> = async (data) => {
    console.log("parsed", loginFormSchema.parse(data));
    console.log("data: ", data);
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0">
      <h2 className="text-3xl mb-9 text-left font-bold">
        Don't miss opportunity to join us!
      </h2>
      <div>
        <p className="text-2xl mb-3 font-medium text-center">
          Login to your account
        </p>
        <form className={"flex flex-col"} onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col h-16">
            <label className="text-sm text-left" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              name="email"
              className="border-b border-black basis-full pl-4"
              type="email"
            />
          </div>
          <p className="text-xs text-red-600 mb-2">
            {errors.email ? errors.email.message : ""}
          </p>

          <div className="flex flex-col h-16">
            <label className="text-sm text-left" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              name="password"
              className="border-b border-black basis-full pl-4"
              type="password"
            />
          </div>
          <p className="text-xs text-red-600 mb-4">
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
              className="text-white font-bold bg-purple-400 hover:bg-purple-100 hover:cursor-pointer w-full p-2 rounded-lg"
            >
              Login
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
