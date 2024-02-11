import { useForm } from "react-hook-form";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { Input } from "../components/Input/Input";

type SendRequestFormProps = {};

const defaultValues = {
  productCode: "",
  productName: "",
  requestType: [],
  note: "",
};

export const SendRequestForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form action="">
      {/* <Input /> */}
      {/* <Input /> */}
      {/* <Input /> */}
      {/* <Input /> */}
      <div className="flex gpa-4">
        <div>Cena netto</div>
        <div>Cena brutto</div>
        <div>Dostępność produktu</div>
        <div>Dostępność odcienia</div>
        <div>Karta techniczna</div>
      </div>
      <Input
        error={errors.productName?.message}
        label="productName"
        {...register("productName")}
      />
      <Input
        error={errors.productCode?.message}
        label="Notatka"
        {...register("productCode")}
      />
      <Input error={errors.note?.message} label="note" {...register("note")} />
    </form>
  );
};

export const Requests = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        content="Tutaj znajduje się strefa pomocy. Składając zapytanie mozesz uzyskać potrzebne informacje dotyczące produktów."
        title="Panel zapytań"
        onClick={() => console.log("request clicked...")}
        buttonContent="Wyślij zapytanie"
      />

      <main className="flex w-full h-full">
        <div className="flex flex-col flex-1 justify-center items-center">
          <h3>Wyślij swoje zapytanie</h3>
          <SendRequestForm />
        </div>
        <div className="flex flex-col flex-1"></div>
      </main>
    </div>
  );
};
