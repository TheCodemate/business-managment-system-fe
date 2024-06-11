import { z } from "zod";

export const addRequestFormSchema = z.object({
  productCode: z.string(),
  collectionName: z
    .string()
    .min(1, { message: "Nazwa produktu jest wymagana" })
    .max(50),
  width: z.string(),
  height: z.string(),
  thickness: z.string(),
  finish: z.string(),
  color: z.string(),
  producer: z.string(),
  type: z.string(),
  productCategory: z
    .string()
    .min(1, { message: "Nie wybrano kategorii produktu" }),
  requestTypes: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Powinna być wybrana minimum jedna kategoria",
    }),
  additionalInfo: z
    .string()
    .max(1500, { message: "Treść moze zawierać maksymalnie 1500 znaków" })
    .optional(),
  contactPerson: z.string().min(1, { message: "Imię klienta jest wymagane" }),
  email: z.string().min(1, { message: "Email jest wymagany" }).max(50),
  phone: z.string().min(1, { message: "Numer telefonu jest wymagany" }),
  files: z.string(),
});
