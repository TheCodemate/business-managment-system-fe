import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { resetPasswordRequestFormSchema } from "../types";
import { useMember } from "../../../hooks/useMember";
import { Input } from "../../Input/Input";
import { Button } from "../../Buttons/Button";

export const ResetPasswordRequestForm = () => {
  const { resetPasswordRequestMutation } = useMember();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(resetPasswordRequestFormSchema),
  });

  console.log("errors: ", errors);

  const submit = async (data: FieldValues) => {
    console.log("1");
    if (resetPasswordRequestFormSchema.parse(data)) {
      console.log("sending password request!");
      resetPasswordRequestMutation.resetPasswordRequest(data.email);
    }
    reset();
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <h1 className="text-xl mb-1 font-medium ">Reset password</h1>
      <p className="text-sm mb-4 text-left">
        Insert your email and press reset button. We will send you reset link
        immediately
      </p>
      {resetPasswordRequestMutation.error ? (
        <div
          role="alert"
          className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
        >
          {resetPasswordRequestMutation.error.message}
        </div>
      ) : null}
      {resetPasswordRequestMutation.confirmationMessage ? (
        <div
          role="alert"
          className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
        >
          {resetPasswordRequestMutation.confirmationMessage}
        </div>
      ) : null}
      <form
        className="flex gap-4 justify-between"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          name="email"
          label="Email"
          register={register}
          error={errors.email}
          type="email"
        />
        <div className="my-4">
          <Button
            content={"Send"}
            disabled={resetPasswordRequestMutation.isPending}
          />
        </div>
      </form>
    </div>
  );
};
