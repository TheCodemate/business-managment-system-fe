import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordFormInputType, resetPasswordFormSchema } from "../types";
import { useMember } from "../../../hooks/useMember";
import { Input } from "../../Input/Input";
import { Button } from "../../Buttons/Button";
import { useParams } from "react-router-dom";

export const ResetPasswordForm = () => {
  const { resetPasswordMutation } = useMember();
  const { resetToken } = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const submit: SubmitHandler<ResetPasswordFormInputType> = async (data) => {
    if (resetPasswordFormSchema.parse(data) && resetToken) {
      resetPasswordMutation.resetPassword(data.password, resetToken);
      reset();
    }
  };
  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <h1 className="text-xl mb-6 font-medium ">Reset password</h1>
      {resetPasswordMutation.error ? (
        <div
          role="alert"
          className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
        >
          {resetPasswordMutation.error}
        </div>
      ) : null}
      {resetPasswordMutation.confirmationMessage ? (
        <div
          role="alert"
          className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
        >
          {resetPasswordMutation.confirmationMessage}
        </div>
      ) : null}
      <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <div className="my-4">
          <Button
            content={"Confirm"}
            disabled={resetPasswordMutation.isPending}
          />
        </div>
      </form>
    </div>
  );
};
