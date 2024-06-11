import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";

export const Settings = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = () => {
    console.log("Settings - account user form submitting...");
  };

  const closeFormHandler = () => {
    console.log("Settings - close form handler ");
  };
  return (
    <div className="flex w-full flex-col p-12 gap-12">
      <h1>Ustawienia konta</h1>
      <div className="flex gap-12">
        {/* Navi */}
        <div className="min-w-[250px] max-w-[360px] min-h-[360px]py-8">
          <ul className="bg-bgPrimary">
            <li className="p-4 hover:bg-slate-300 hover:cursor-pointer">
              <div className="flex justify-center">
                <PersonIcon /> Ustawienia Profilu
              </div>
            </li>
          </ul>
        </div>

        {/* //Avatar Section */}
        <div className="bg-bgPrimary p-12">
          <div className="flex items-center gap-20 w-full bg-bgPrimary">
            <div className="flex justify-center items-center bg-primary min-h-[150px] max-h-[300px] aspect-square rounded-full">
              Avatar
            </div>

            <div className="flex gap-8">
              <Button className="text-nowrap" variant={"outline"}>
                Upload Avatar
              </Button>
              <Button
                className="text-alternate font-bold text-nowrap"
                variant={"default"}
              >
                Delete Avatar
              </Button>
            </div>
          </div>

          <div>
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full col-span-12 lg:col-span-6">
                        <FormLabel className="text-sm font-bold text-neutral600">
                          Imię
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full col-span-12 lg:col-span-4">
                        <FormLabel className="text-sm font-bold text-neutral600">
                          Nazwisko
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
          </div>
        </div>
      </div>
    </div>
  );
};
