import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMember } from "../../../hooks/useMember";
import { Input } from "../../Input/Input";
import { Button } from "../../Buttons/Button";
import { RegisterFromInputsType, registerFormSchema } from "../types";

export const RegisterFrom = () => {
  const { registerMutation } = useMember();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFromInputsType>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit = async (data: RegisterFromInputsType) => {
    if (registerFormSchema.parse(data)) {
      registerMutation.register({ email: data.email, password: data.password });
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-md p-12 shadow-lg rounded-lg mt-0 bg-bgPrimary">
      <p className="text-3xl mb-0 text-left font-bold">Join the app</p>
      <h1 className="text-xl mb-6 font-medium ">Login to your account</h1>
      {registerMutation.error ? (
        <div
          role="alert"
          className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
        >
          {registerMutation.error.message}
        </div>
      ) : null}
      {registerMutation.confirmationMessage ? (
        <div
          role="alert"
          className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
        >
          {registerMutation.confirmationMessage.message}
        </div>
      ) : null}
      <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
        <Input
          name="email"
          label="Email"
          register={register}
          error={errors.email}
        />
        <Input
          name="password"
          label="Password"
          register={register}
          error={errors.password}
          type="password"
        />
        <Input
          name="confirmPassword"
          label="Confirm password"
          register={register}
          error={errors.confirmPassword}
          type="password"
        />
        <div className="my-4">
          <Button content={"Register"} disabled={registerMutation.isPending} />
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

      {/* <Backdrop>
        {(toggleHandler) => (
          <Dialog onCloseHandler={toggleHandler}>
            <Dialog.Title>It's your custom dialog Title</Dialog.Title>
            <Dialog.Content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              arcu augue, mollis at enim nec, congue rutrum magna. Aliquam
              egestas aliquam accumsan. Nulla facilisi. Phasellus pellentesque
              vehicula mi, sit amet tincidunt lacus tempus quis.
            </Dialog.Content>
            <Dialog.Actions>
              <Dialog.RejectButton
                onClick={() => console.log("reject clicked")}
              />
              <Dialog.AcceptButton
                onClick={() => console.log("accept clicked")}
              />
            </Dialog.Actions>
          </Dialog>
        )}
      </Backdrop> */}
    </div>
  );
};
