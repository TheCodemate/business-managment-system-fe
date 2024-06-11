import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchBar } from "../../../../components/SearchBar/SearchBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { usePostNewRequest } from "@/services/mutations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  RequestRequestType,
  UploadedFile,
  requestRequestSchema,
} from "@/types";
import { FileUploader } from "@/components/FileUploader/FileUploader";
import { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Dialog } from "@/components/Dialog/Dialog";

const items = [
  {
    id: "price",
    label: "Cena detaliczna PLN (brutto)",
  },
  {
    id: "purchasePrice",
    label: "Cena zakupu PLN (netto z transportem)",
  },
  {
    id: "availability",
    label: "Chcę wiedzieć czy produkt jest dostępny w fabryce",
  },
  {
    id: "productionDate",
    label: "Sprawdzam kiedy produkt będzie produkowany",
  },
  {
    id: "substitute",
    label: "Poszukuję zamiennika",
  },
  {
    id: "technicalDocumentation",
    label: "Potrzebuję kartę techniczną",
  },
] as const;

type Props = {
  closeFormHandler: () => void;
};

export const SearchRequestForm = ({ closeFormHandler }: Props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [validData, setValidData] = useState({} as RequestRequestType);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: postNewRequest } = usePostNewRequest();

  const form = useForm<RequestRequestType>({
    resolver: zodResolver(requestRequestSchema),
    defaultValues: {
      requestTypes: ["price"],
      productCode: "",
      collectionName: "",
      format: "",
      finish: "",
      producer: "",
      color: "",
      quantity: "",
      productCategory: "ceramicTiles",
      additionalInfo: "",
      contactPerson: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
      uploadedFiles: [],
      unit: "m2",
    },
  });

  const setProductValues = (product: any) => {
    form.setValue(
      "productCode",
      product.productCode ? product.productCode : ""
    );
    form.setValue("collectionName", product.collectionName);
    form.setValue("color", product.color ? product.color : "");
    form.setValue("format", product.format);
    form.setValue("finish", product.finish ? product.finish : "");
    form.setValue("producer", product.producer);
  };

  const confirmationToggler = () => {
    setIsConfirmationOpen((prev) => !prev);
  };

  const closeConfirmationHandler = () => {
    setIsConfirmationOpen(false);
  };

  const openConfirmationHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onSubmit = (values: RequestRequestType) => {
    try {
      setValidData((prev) => {
        prev = values;
        return prev;
      });
      openConfirmationHandler();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(
        "Unexpected error ocurred while submitting new request. Try again later."
      );
    }
  };

  const acceptSearchHandler = () => {
    return setProductValues;
  };

  const confirmationHandler = async () => {
    try {
      setIsLoading(true);
      postNewRequest(validData);
      closeConfirmationHandler();
      closeFormHandler();
      form.reset();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  };

  const onClose = () => {
    closeFormHandler();
    closeConfirmationHandler();
  };

  const onUploadHandler = (file: UploadedFile) => {
    form.setValue("uploadedFiles", [...form.getValues("uploadedFiles"), file]);
  };

  return (
    <>
      <Form {...form}>
        <form
          id="searchRequestForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="w-full flex flex-col">
            <SearchBar searchAcceptHandler={acceptSearchHandler()} />
            <p className="font-bold text-redSecondary text-sm">
              {form.formState.errors.collectionName?.message}
            </p>
          </div>
          <fieldset className="flex gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Ilość
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details"
                      placeholder="np.: 1,44; 10; 12.8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-redSecondary" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="col-span-2 grow-2 h-full">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Jednostka
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-details">
                        <SelectValue placeholder="Wybierz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={"bg-bgPrimary"}>
                      <SelectItem className={"flex bg-bgPrimary"} value="m2">
                        m2
                      </SelectItem>
                      <SelectItem value="szt">szt</SelectItem>
                      <SelectItem value="mb">mb</SelectItem>
                      <SelectItem value="komplet">komplet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-bold text-redSecondary" />
                </FormItem>
              )}
            />
          </fieldset>
          <FormField
            control={form.control}
            name="requestTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Jakie informacje są Ci potrzebne?
                  </FormLabel>
                </div>
                <div className="flex flex-col gap-4 flex-wrap">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="requestTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-1 space-y-0 text-nowrap"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="text-xs font-bold text-redSecondary" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-neutral600">
                  Dodatkowe informacje
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Umieść tu wszystkie dodatkowe szczegóły dotyczące zapytania, które mogą przyspieszyć odpowiedź"
                    className="bg-bgPrimary border-details resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-bold text-redSecondary" />
              </FormItem>
            )}
          />

          <FileUploader onUploadHandler={onUploadHandler} />

          <fieldset className="grid grid-cols-6 gap-4 w-full flex-wrap border-t border-t-details py-2">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem className="w-full col-span-6 xl:col-span-2">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Osoba kontaktowa
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="bg-bgPrimary border-details w-full "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-redSecondary" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPersonEmail"
              render={({ field }) => (
                <FormItem className="w-full col-span-6 md:col-span-3 xl:col-span-2">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Email kontaktowy
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="bg-bgPrimary border-details w-full "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-redSecondary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPersonPhone"
              render={({ field }) => (
                <FormItem className="w-full col-span-6 md:col-span-3 xl:col-span-2">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Telefon kontaktowy
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="bg-bgPrimary border-details w-full "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-redSecondary" />
                </FormItem>
              )}
            />
          </fieldset>
        </form>
      </Form>
      <footer className="flex gap-4 justify-end p-6">
        <Button
          className="font-bold  text-neutral600"
          variant={"outline"}
          onClick={onClose}
        >
          Anuluj
        </Button>
        <Button
          type="submit"
          form="searchRequestForm"
          className="text-alternate font-bold"
        >
          Wyślij
        </Button>
      </footer>

      <Modal isOpen={isConfirmationOpen} toggleModal={confirmationToggler}>
        <Dialog
          headerText="Potwierdzenie zapytania"
          bodyText={`To ostatni moment w którym mozesz sprawdzi czy wprowadzone dane na
          pewno są poprawne. Kliknij "Wróć", zeby sprawdzić zapytanie ponownie
          lub "Potwierdź", zeby przesłać zapytanie do logistyki`}
          acceptButtonText="Wyślij"
          rejectButtonText="Cofnij"
          rejectHandler={closeConfirmationHandler}
          acceptHandler={confirmationHandler}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};
