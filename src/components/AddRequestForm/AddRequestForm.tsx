import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import { delay } from "@/utils/delay";
import { CloseButton } from "../Buttons/CloseButton";
import { Loading } from "../Loading/Loading";
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

import { RequestRequestType, requestRequestSchema } from "@/types";

const items = [
  {
    id: "price",
    label: "Cena brutto",
  },
  {
    id: "priceNet",
    label: "Cena netto zakupu",
  },
  {
    id: "availability",
    label: "Dostępność",
  },
  {
    id: "productionDate",
    label: "Termin produkcji",
  },
  {
    id: "substitute",
    label: "Porzukiwanie zamiennika",
  },
  {
    id: "technicalDocumentation",
    label: "Karta techniczna",
  },
] as const;

type Props = {
  closeHandler: () => void;
};

export const AddRequestForm = ({ closeHandler }: Props) => {
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
      width: "",
      height: "",
      thickness: "",
      finish: "",
      producer: "",
      color: "",
      quantity: "",
      productCategory: "ceramicTiles",
      additionalInfo: "",
      contactPerson: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
      files: "",
    },
  });

  const closeConfirmationHandler = () => {
    setIsConfirmationOpen(false);
  };

  const openConfirmationHandler = () => {
    setIsConfirmationOpen(true);
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
      await delay(3000, () => closeHandler());
      setIsLoading(false);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-0 lg:top-[5%] left-1/2 -translate-x-1/2 max-w-[1020px] min-w-[360px] bg-alternate rounded-xl overflow-y-scroll"
    >
      <header className="flex bg-neutral100 px-6 py-3 justify-between items-center">
        <span className="text-sm font-bold text-neutral600">
          Zapytanie nr 523452345
        </span>
        <CloseButton onClick={closeHandler} />
      </header>
      <main className="p-6">
        <Form {...form}>
          <form
            id="requestForm"
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
                  <FormItem className="col-span-12 lg:col-span-2 xl:col-span-4">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Kategoria
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Wybierz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={""}>
                        <SelectItem className="" value="ceramicTiles">
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
                  <FormItem className="w-full col-span-8 lg:col-span-4 xl:col-span-4">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Producent
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                  <FormItem className="w-full col-span-8 lg:col-span-2 xl:col-span-4">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Kod
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent grow-2"
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
                  <FormItem className="w-full col-span-8 lg:col-span-6 xl:col-span-6">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Nazwa produktu
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                  <FormItem className="w-full col-span-8 lg:col-span-2 xl:col-span-4">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Kolor
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full col-span-8 lg:col-span-2 xl:col-span-2">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Ilość
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent grow-2"
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
                name="width"
                render={({ field }) => (
                  <FormItem className="w-full col-span-8 lg:col-span-3">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Szerokość
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                name="height"
                render={({ field }) => (
                  <FormItem className="w-full col-span-8 lg:col-span-3">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Wysokość
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                name="thickness"
                render={({ field }) => (
                  <FormItem className="w-full col-span-8 lg:col-span-3">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Grubość
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
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
                  <FormItem className="w-full col-span-8 lg:col-span-3">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Wykończenie
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent flex-1"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
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
                  <div className="flex gap-4 flex-wrap">
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
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
                      className="bg-transparent resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className="text-alternate">
                  <FormLabel className="flex gap-2 w-fit items-center text-sm py-2 px-4 rounded-lg font-bold text-alternate bg-primary text-primary-foreground hover:bg-primary/90">
                    <NoteAddOutlinedIcon />
                    Załącz plik
                  </FormLabel>
                  <FormControl>
                    <Input
                      hidden
                      className="text-neutral600 opacity-0 w-0 h-0 p-0"
                      placeholder="Załącz pliki"
                      multiple
                      type="file"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-red-500" />
                  <div className="text-neutral600">
                    {field.value ? field.value : null}
                  </div>
                </FormItem>
              )}
            />

            <fieldset className="grid grid-cols-6 gap-4 w-full flex-wrap">
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
                        className="bg-transparent w-full "
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
                        className="bg-transparent w-full "
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
                        className="bg-transparent w-full "
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
      </main>
      <footer className="flex gap-4 justify-end p-6">
        <Button
          className="font-bold  text-neutral600"
          variant={"outline"}
          onClick={closeHandler}
        >
          Anuluj
        </Button>
        <Button
          type="submit"
          form="requestForm"
          className="text-alternate font-bold"
        >
          Wyślij
        </Button>
      </footer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isConfirmationOpen && (
          <Dialog
            closeHandler={closeConfirmationHandler}
            confirmationHandler={confirmationHandler}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

type DialogProps = {
  closeHandler: () => void;
  confirmationHandler: () => void;
  isLoading?: boolean;
};

const Dialog = ({
  closeHandler,
  confirmationHandler,
  isLoading,
}: DialogProps) => {
  return (
    <div className="flex flex-col gap-6 top-1/2 left-1/2 min-w-[360px] max-w-[800px] bg-alternate p-6 rounded-xl shadow-xl">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-xl">Potwierdzenie zapytania</h3>
        <p>
          To ostatni moment w którym mozesz sprawdzi czy wprowadzone dane na
          pewno są poprawne. Kliknij "Wróć", zeby sprawdzić zapytanie ponownie
          lub "Potwierdź", zeby przesłać zapytanie do logistyki
        </p>
      </div>
      <div className="flex justify-end gap-6">
        <Button
          className=" font-bold  text-neutral600 min-w-[120px]"
          variant={"outline"}
          onClick={closeHandler}
        >
          Lepiej sprawdzę
        </Button>
        <Button
          disabled={isLoading}
          className="text-alternate font-bold min-w-[120px]"
          onClick={confirmationHandler}
        >
          {isLoading ? <Loading size={20} color="#FFFFFF" /> : "Potwierdzam"}
        </Button>
      </div>
    </div>
  );
};
