import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../../services/mutations";

import { Input } from "../../Input/Input";
import { Button } from "../../Buttons/Button";

import { RegisterFromInputsType, registerFormSchema } from "../types";

export const RegisterFrom = () => {
  const { data, error, mutate: registerUser, isPending } = useRegister();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<RegisterFromInputsType> = async (data) => {
    registerUser({ email: data.email, password: data.password });
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <p className="text-3xl mb-0 text-left font-bold">Join the app</p>
      <h1 className="text-xl mb-6 font-medium ">Login to your account</h1>
      {error ? (
        <div
          role="alert"
          className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
        >
          {error.message}
        </div>
      ) : null}
      {data.message ? (
        <div
          role="alert"
          className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
        >
          {data.message}
        </div>
      ) : null}
      <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <Input
          label="Confirm password"
          error={errors.confirmPassword?.message}
          type="password"
          {...register("confirmPassword")}
        />
        <div className="my-4">
          <Button content={"Register"} disabled={isPending} />
        </div>

        <NavLink
          className={
            "block text-white font-bold bg-alternate text-primary border-primary border hover:cursor-pointer w-full p-2 rounded-lg text-center"
          }
          to={"/login"}
        >
          Login
        </NavLink>
      </form>
    </div>
  );
};
