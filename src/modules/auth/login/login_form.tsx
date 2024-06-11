import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "./use_login";
import { LoginFormInputsType, loginFormSchema } from "./types";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Buttons/Button";
import { ErrorDisplay } from "@/components/error_display/error_display";

export const LoginForm = () => {
  const { error, mutate: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

  const submit: SubmitHandler<LoginFormInputsType> = async (data) => {
    login({
      email: data.email,
      password: data.password,
    });
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <p className="text-3xl mb-0 text-left font-bold">Welcome!</p>
      <h1 className="text-xl mb-6 font-medium">Login to your account</h1>
      <ErrorDisplay error={error} />
      <div hidden id="login-form">
        Formularz logowania
      </div>
      <form
        className={"flex flex-col"}
        onSubmit={handleSubmit(submit)}
        aria-labelledby="login-form"
      >
        <Input
          label={"Email"}
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label={"Password"}
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <NavLink
          to="/reset-password-request"
          className="cursor-pointer text-xs text-right mb-7 text-purple-700 tracking-widest"
        >
          forgot password?
        </NavLink>
        <Button content="Login" />
        <span className="my-2 text-center font-bold">or</span>
        <NavLink
          className={
            "block font-bold bg-alternate text-primary border-primary border hover:cursor-pointer w-full p-2 rounded-lg text-center"
          }
          to={"/register"}
        >
          Register
        </NavLink>
      </form>
    </div>
  );
};
