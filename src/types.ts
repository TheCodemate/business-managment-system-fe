import { ZodString, ZodTypeAny, ZodUnion, z } from "zod";

export type IconTypes = "add" | "null";

const doesStringContainNumbersOnly = (
  stringToCheck: ZodString | ZodUnion<[ZodTypeAny, ...ZodTypeAny[]]>
) => stringToCheck.refine((value) => /^[0-9]+$/.test(value));

const addressSchema = z.object({
  street: z
    .string()
    .min(2, { message: "Street name must be 2 chars long at least." }),
  streetNumber: z
    .string()
    .min(1, { message: "Street number must be provided" })
    .max(5, { message: "Street number cannot be longer than 5 digits" }),
  apartmentNumber: doesStringContainNumbersOnly(
    z
      .string()
      .max(5, { message: "Apartment number cannot be longer than 5 digits" })
      .or(z.literal(""))
  ),
  city: z.string(),
  postalCode: doesStringContainNumbersOnly(z.string().min(3).max(7)),
  post: z.string(),
  country: z.string(),
});

const contactPersonSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  phoneNumber: z
    .string()
    .min(7, { message: "Phone number must contain at least 7 digits" })
    .max(12, {
      message: "Phone number must not contain more than 10 digits",
    }),
  email: z.string().email({ message: "Incorrect email" }),
});

const paymentTypeSchema = z.enum(["cash", "bankTransfer"]).optional();

export const customerSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long" })
    .max(255, { message: "Name cannot be longer than 255 characters" }),
  shortName: z.string().max(255),

  vatNo: z
    .string()
    .min(7, { message: "Vat number must be at least 7 characters long" })
    .max(10, { message: "Vat number cannot be longer than 10 characters" }),
  isCompany: z.boolean(),
  address: addressSchema,
  paymentTerm: z.string(),
  paymentType: paymentTypeSchema,
  contactPerson: contactPersonSchema,
  note: z.string().max(2000).optional(),
});

const packingSchema = z.object({
  package: z.number(),
  pallete: z.number(),
});

const dimensionSchema = z.object({
  metric: z.object({
    distanceUnit: z.string(),
    height: z.number(),
    width: z.number(),
    thickness: z.number(),
    weight: z.number(),
    weightUnit: z.string(),
  }),
  imperial: z.object({
    distanceUnit: z.string(),
    height: z.number(),
    width: z.number(),
    thickness: z.number(),
    weight: z.number(),
    weightUnit: z.string(),
  }),
});

const slipResistantSchema = z.object({
  DIN51097: z.array(z.enum(["A", "B", "C"])),
  DIN51130: z.array(z.enum(["R9", "R10", "R11", "R12", "R13"])),
});

const productSchema = z.object({
  productName: z.string(),
  productDescription: z.string(),
  productCode: z.string(),
  categories: z.array(z.string()),
  price: z.number(),
  stockAmount: z.number(),
  productProducer: z.string(),
  brandName: z.string(),
  color: z.string(),
  packing: packingSchema,
  dimensions: dimensionSchema,
  material: z.string(),
  finish: z.string(),
  slipResistance: slipResistantSchema,
  createdDate: z.string(),
  updatedDate: z.string(),
  isActive: z.boolean(),
  images: z.array(z.string()),
});

export type CustomerType = z.infer<typeof customerSchema>;
export type ProductType = z.infer<typeof productSchema>;
