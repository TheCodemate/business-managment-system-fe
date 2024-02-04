import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ResetPasswordRequestFormInputType,
  resetPasswordRequestFormSchema,
} from "../types";
import { Input } from "../../Input/Input";
import { Button } from "../../Buttons/Button";
import { useRequestUserPasswordReset } from "../../../services/mutations";

export const ResetPasswordRequestForm = () => {
  const {
    data,
    mutate: sendResetUserPasswordRequest,
    error,
    isPending,
  } = useRequestUserPasswordReset();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPasswordRequestFormSchema),
  });

  const submit: SubmitHandler<ResetPasswordRequestFormInputType> = async (
    data
  ) => {
    sendResetUserPasswordRequest(data.email);
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <h1 className="text-xl mb-1 font-medium ">Reset password</h1>
      <p className="text-sm mb-4 text-left">
        Insert your email and press reset button. We will send you reset link
        immediately
      </p>
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
      <form
        className="flex flex-col gap-2 justify-between"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Email"
          type="email"
          placeholder={"Insert email..."}
          error={errors.email?.message}
          {...register("email")}
        />
        <Button content={"Send"} disabled={isPending} />
      </form>
    </div>
  );
};
