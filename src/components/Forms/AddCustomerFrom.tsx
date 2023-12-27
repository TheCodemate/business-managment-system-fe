import { InputHTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { Button } from "../Buttons/Button";
import { InputsSchema, InputsType } from "./types";
import { CloseButton } from "../Buttons/CloseButton";

type InputProps = {
  label: string;
  register: UseFormRegister<InputsType>;
  name: Path<InputsType>;
  width?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style">;

const Input = ({ width, label, register, ...props }: InputProps) => {
  return (
    <div className={`flex flex-col flex-1 justify-stretch  w-[${width}%]`}>
      <label className="font-bold text-xs m-1" htmlFor={props.name}>
        {label}
      </label>
      <input
        onClick={(e) => e.stopPropagation()}
        className={`border border-details bg-bgPrimary text-details rounded-lg pl-4 h-10`}
        onFocus={(e) => console.log(e)}
        placeholder={label}
        {...register(props.name)}
      />
    </div>
  );
};

type AddCustomerFromProps = {
  onCloseHandler: () => void;
};

export const AddCustomerForm = ({ onCloseHandler }: AddCustomerFromProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputsType>({ resolver: zodResolver(InputsSchema) });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    reset();
    console.log(data);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-bgPrimary rounded-lg p-8 min-w-[340px]"
    >
      <header className="flex justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Add company</h2>
          <p>Insert all the data to insert costumer into a database</p>
        </div>
        <div
          className="flex items-center justify-center "
          onClick={onCloseHandler}
        >
          <CloseButton />
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-alternate opacity-100 gap-4 rounded-lg"
      >
        <fieldset className=" flex flex-col border border-details p-8 rounded-lg text-textPrimary">
          <legend>Company's detail</legend>
          <div className="flex flex-col justify-stretch items-stretch gap-4 sm:flex-row">
            <Input
              width={77}
              label="Company name"
              name="companyName"
              register={register}
            />
            <Input width={23} label="Vat No" name="vatNo" register={register} />
          </div>
          <div className="flex flex-col justify-stretch items-stretch gap-4 sm:flex-row">
            <Input label="Street" name="street" register={register} />
            <Input label="Number" name="number" register={register} />
            <Input
              label="Apartment no"
              name="apartmentNo"
              register={register}
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input label="City" name="city" register={register} />
            <Input label="Postal code" name="postalCode" register={register} />
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-4 border border-details p-8 rounded-lg text-textPrimary">
          <legend>Contact person's details</legend>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Input label="First Name" name="firstName" register={register} />
            <Input label="Last name" name="lastName" register={register} />
          </div>
          <div>
            <Input label="Email" name="email" register={register} />
            <Input
              label="Contact number"
              name="contactNumber"
              register={register}
            />
          </div>
        </fieldset>
        <div className="flex justify-center items-center">
          <Button content="Add Customer" variant="basic" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
