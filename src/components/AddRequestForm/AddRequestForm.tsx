import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import { useForm } from "react-hook-form";

import { CloseButton } from "../Buttons/CloseButton";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

import { addRequestFormSchema } from "./types";

const items = [
  {
    id: "price",
    label: "Cena brutto",
  },
  {
    id: "purchaseNetPrice",
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
  const form = useForm<z.infer<typeof addRequestFormSchema>>({
    resolver: zodResolver(addRequestFormSchema),
    defaultValues: {
      productCode: "",
      collectionName: "",
      width: "",
      height: "",
      thickness: "",
      finish: "",
      type: "",
      producer: "",
      color: "",
      productCategory: "",
      requestTypes: ["price"],
      additionalInfo: "",
      contactPerson: "",
      email: "",
      phone: "",
      files: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addRequestFormSchema>) => {
    console.log(values);
  };

  console.log("form field: ", form.getValues());
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
            <fieldset className="grid grid-cols-8 gap-4 w-full">
              <legend className="mb-4 text-sm font-bold text-neutral600">
                Wprowadź dane produktu
              </legend>
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem className="col-span-8 lg:col-span-4 xl:col-span-4">
                    <FormLabel className="text-sm font-bold text-neutral600">
                      Kategoria
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
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
                  <FormItem className="w-full col-span-8 lg:col-span-2 xl:col-span-2">
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
                name="width"
                render={({ field }) => (
                  <FormItem className="w-full col-span-8 lg:col-span-2">
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
                  <FormItem className="w-full col-span-8 lg:col-span-2">
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
                  <FormItem className="w-full col-span-8 lg:col-span-2">
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
                  <FormItem className="w-full col-span-8 lg:col-span-2">
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
                name="email"
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
                name="phone"
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
          className=" font-bold  text-neutral600"
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
    </div>
  );
};

//kod produktu
//wymiar a - dodać tooltipa
//wymiar b
//wymiar c
//nazwa producenta
//nazwa kolekcji
//kolor
