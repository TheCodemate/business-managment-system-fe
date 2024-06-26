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

export const cartItemRequestSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
});

export const productSchema = z.object({
  product_id: z.string(),
  product_name: z.string(),
  product_description: z.string(),
  product_code: z.string(),
  categories: z.array(z.string()),
  price: z.number(),
  stock_amount: z.number(),
  producer: z.string(),
  brand_name: z.string(),
  color: z.string(),
  package: z.number(),
  pallete: z.number(),
  size_unit: z.string(),
  height: z.number(),
  width: z.number(),
  thickness: z.number(),
  weight: z.number(),
  weight_unit: z.string(),
  material: z.string(),
  finish: z.string(),
  slip_resistance_DIN51097: z.array(z.string()),
  slip_resistance_DIN51130: z.string(),
  created_date: z.date(),
  updated_date: z.date(),
  is_active: z.boolean(),
  images: z.array(z.string()),
});

const cartItemResponseSchema = z.object({
  cart_item_id: z.string(),
  shopping_cart_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  product: productSchema,
});

const uploadedProductsResponse = z.object({
  uploadedProductId: z.string(),
  collectionName: z.string(),
  productName: z.string(),
  eanCode: z.number(),
  productCode: z.string(),
  finish: z.string(),
  format: z.string(),
  weight: z.number(),
  M2xPKG: z.number(),
  PCxPKG: z.number(),
  M2xPLT: z.number(),
  unit: z.string(),
  color: z.string(),
  producer: z.string(),
  category: z.string(),
});
const uploadProductRequestSchema = z.object({
  collectionName: z.string(),
  productName: z.string(),
  eanCode: z.number().optional(),
  productCode: z.string().optional(),
  finish: z.string().optional(),
  format: z.string(),
  weight: z.number(),
  M2xPKG: z.number(),
  PCxPKG: z.number(),
  M2xPLT: z.number(),
  PCxPLT: z.number(),
  unit: z.string(),
  color: z.string(),
  producer: z.string(),
  category: z.string(),
});

export type CartItemType = z.infer<typeof cartItemRequestSchema>;
export type CartItemResponseType = z.infer<typeof cartItemResponseSchema>;
export type CustomerType = z.infer<typeof customerSchema>;
export type ProductType = z.infer<typeof productSchema>;
export type UploadedProductResponseType = z.infer<
  typeof uploadedProductsResponse
>;
export type UploadedProductRequestType = z.infer<
  typeof uploadProductRequestSchema
>;
