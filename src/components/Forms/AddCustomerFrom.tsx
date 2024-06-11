import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddCustomer } from "@/services/mutations";
import { useCustomer } from "@/hooks/useCustomer";

import { Button } from "../Buttons/Button";
import { CloseButton } from "../Buttons/CloseButton";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { CheckboxButton } from "../Buttons/CheckboxButton";
import { CustomerType, customerSchema } from "@/types";

type AddCustomerFromProps = {
  onCloseHandler: () => void;
};

const defaultValues: CustomerType = {
  companyName: "",
  shortName: "",
  vatNo: "",
  isCompany: true,
  paymentTerm: "",
  paymentType: "cash" as const,
  address: {
    street: "",
    streetNumber: "",
    apartmentNumber: "",
    city: "",
    postalCode: "",
    post: "",
    country: "",
  },
  contactPerson: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
};

export const AddCustomerForm = ({ onCloseHandler }: AddCustomerFromProps) => {
  const { mutate: addCustomer } = useAddCustomer();
  const { addCustomerMutation } = useCustomer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(customerSchema),
  });

  const onSuccessHandler = (data: CustomerType) => {
    reset();
    return data;
  };

  const onErrorHandler = (error: Error) => error.message;

  const submit: SubmitHandler<CustomerType> = (data) => {
    addCustomer(data, {
      onSuccess: onSuccessHandler,
      onError: onErrorHandler,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-bgPrimary rounded-lg p-8 min-w-[340px] max-w-[1020px]"
    >
      <header className="flex justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Add company</h2>
          <p>Insert all the data to insert costumer into a database</p>
        </div>
        <div className="flex items-center justify-center ">
          <CloseButton onClick={onCloseHandler} />
        </div>
      </header>
      {addCustomerMutation.error ? (
        <div
          role="alert"
          className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
        >
          {addCustomerMutation.error}
        </div>
      ) : null}
      {addCustomerMutation.confirmationMessage ? (
        <div
          role="alert"
          className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
        >
          {addCustomerMutation.confirmationMessage}
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col bg-alternate opacity-100 gap-4 rounded-lg"
      >
        <fieldset className="flex flex-col border border-details p-8 rounded-xl gap-4 sm:grid sm:grid-cols-4 sm:grid-rows-2">
          <legend className="px-2 text-textDetails font-bold">
            Company details
          </legend>
          <div className={"col-span-3"}>
            <Input
              id="companyName"
              variant="outlined"
              label="Company name"
              error={errors.companyName?.message}
              {...register("companyName")}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              id="vatNo"
              variant="outlined"
              label="Vat No"
              error={errors.vatNo?.message}
              {...register("vatNo")}
            />
          </div>
          <Input
            id="shortName"
            variant="outlined"
            label="Short name"
            error={errors.shortName?.message}
            {...register("shortName")}
          />

          <Select
            id="paymentTerm"
            label="Payment term"
            error={errors.paymentType?.message}
            options={[
              "0",
              "7",
              "14",
              "21",
              "30",
              "45",
              "60",
              "90",
              "120",
              "150",
              "180",
            ]}
            {...register("paymentTerm")}
          />
          <Select
            id="paymentType"
            label="Payment type"
            options={["cash", "bank transfer"]}
            error={errors.paymentType?.message}
            {...register("paymentType")}
          />
          <CheckboxButton
            id="isCompany"
            content={"Is company?"}
            {...register("isCompany")}
          />
        </fieldset>

        <fieldset className="border border-details p-8 rounded-xl gap-4 sm:grid sm:grid-cols-4">
          <legend className="px-2 text-textDetails font-bold">
            Company address
          </legend>

          <div className="col-span-2">
            <Input
              id="address.street"
              variant="outlined"
              label="Street"
              error={errors.address?.street?.message}
              {...register("address.street")}
            />
          </div>
          <Input
            id="address.streetNumber"
            variant="outlined"
            error={errors.address?.streetNumber?.message}
            label="Number"
            {...register("address.streetNumber")}
          />
          <Input
            id="address.apartmentNumber"
            variant="outlined"
            label="Apartment no"
            error={errors.address?.apartmentNumber?.message}
            {...register("address.apartmentNumber")}
          />
          <Input
            id="address.city"
            variant="outlined"
            label="City"
            error={errors.address?.city?.message}
            {...register("address.city")}
          />
          <Input
            id="address.postalCode"
            variant="outlined"
            label="Postal code"
            error={errors.address?.postalCode?.message}
            {...register("address.postalCode")}
          />
          <Input
            id="address.country"
            variant="outlined"
            label="Country"
            error={errors.address?.country?.message}
            {...register("address.country")}
          />
          <Input
            id="address.post"
            variant="outlined"
            label="Post"
            error={errors.address?.post?.message}
            {...register("address.post")}
          />
        </fieldset>

        <fieldset className="border border-details p-8 rounded-xl gap-4 sm:grid sm:grid-cols-4 ">
          <legend className="px-2 text-textDetails font-bold">
            Contact person's details
          </legend>
          <Input
            id="contactPerson.firstName"
            variant="outlined"
            label="First Name"
            error={errors.contactPerson?.firstName?.message}
            autoComplete="contactPerson.firstName"
            {...register("contactPerson.firstName")}
          />
          <Input
            id="contactPerson.lastName"
            variant="outlined"
            label="Last name"
            error={errors.contactPerson?.lastName?.message}
            {...register("contactPerson.lastName")}
          />
          <Input
            id="contactPerson.email"
            variant="outlined"
            label="Email"
            error={errors.contactPerson?.email?.message}
            {...register("contactPerson.email")}
          />
          <Input
            id="contactPerson.phoneNumber"
            variant="outlined"
            label="Contact number"
            error={errors.contactPerson?.phoneNumber?.message}
            {...register("contactPerson.phoneNumber")}
          />
        </fieldset>

        <div className="flex justify-center items-center mt-4">
          <Button content="Add Customer" />
        </div>
      </form>
    </div>
  );
};
