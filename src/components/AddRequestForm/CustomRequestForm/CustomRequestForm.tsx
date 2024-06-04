import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
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
export const CustomRequestForm = ({ closeFormHandler }: Props) => {
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
      unit: "szt",
    },
  });

  const closeConfirmationHandler = () => {
    setIsConfirmationOpen(false);
  };

  const openConfirmationHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onUploadHandler = (file: UploadedFile) => {
    form.setValue("uploadedFiles", [...form.getValues("uploadedFiles"), file]);
  };

  const confirmationToggler = () => {
    setIsConfirmationOpen((prev) => !prev);
  };

  const onSubmit = (values: RequestRequestType) => {
    try {
      setValidData(values);
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

  const confirmationHandler = async () => {
    try {
      setIsLoading(true);
      postNewRequest(validData);
      setIsLoading(false);
      closeFormHandler();
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          id="customRequestForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <fieldset className="grid grid-cols-12 gap-4 w-full">
            <legend className="mb-4 text-sm font-bold text-neutral600">
              Wprowadź dane produktu
            </legend>

            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Kategoria
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
                      <SelectItem className="bg-bgPrimary" value="ceramicTiles">
                        Płytki
                      </SelectItem>
                      <SelectItem value="bathroomEquipment">
                        Wyposazenie łazienkowe
                      </SelectItem>
                      <SelectItem value="accessories">Akcesoria</SelectItem>
                      <SelectItem value="lightning">Oświetlenie</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="producer"
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-6">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Producent
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details flex-1"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productCode"
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-4">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Kod
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details grow-2"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionName"
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-8">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Nazwa produktu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details flex-1"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-4">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Kolor
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details flex-1"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finish"
              render={({ field }) => (
                // <FormItem className="w-full col-span-8 lg:col-span-3">
                <FormItem className="w-full col-span-12 lg:col-span-4">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Wykończenie
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details flex-1"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-4">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Format
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details flex-1"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="flex gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="col-span-8">
                  <FormLabel className="text-sm font-bold text-neutral600">
                    Ilość
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-bgPrimary border-details"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel className="text-sm font-bold text-neutral600 h-full">
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
                      <SelectItem className="" value="m2">
                        m2
                      </SelectItem>
                      <SelectItem value="szt">szt</SelectItem>
                      <SelectItem value="mb">mb</SelectItem>
                      <SelectItem value="komplet">komplet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-bold text-red-500" />
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
                <FormMessage className="text-xs font-bold text-red-500" />
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
                <FormMessage className="text-xs font-bold text-red-500" />
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
                  <FormMessage className="text-xs font-bold text-red-500" />
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
                  <FormMessage className="text-xs font-bold text-red-500" />
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
                  <FormMessage className="text-xs font-bold text-red-500" />
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
          onClick={closeFormHandler}
        >
          Anuluj
        </Button>
        <Button
          type="submit"
          form="customRequestForm"
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
