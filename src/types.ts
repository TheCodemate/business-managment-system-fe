import { ZodString, ZodTypeAny, ZodUnion, z } from "zod";

export type IconTypes = "add" | "null" | "addRequest";

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

export const requestSchema = z.object({
  requestTypes: z.array(
    z.enum([
      "price",
      "priceNet",
      "availability",
      "productionDate",
      "substitute",
      "technicalDocumentation",
    ])
  ),
  productCode: z
    .string()
    .min(1, { message: "Kod produktu jest wymagane" })
    .max(50),
  collectionName: z
    .string()
    .min(1, { message: "Nazwa produktu jest wymagana" })
    .max(50),
  width: z.string(),
  height: z.string(),
  thickness: z.string(),
  finish: z.string(),
  producer: z.string().min(1, { message: "Producent jest wymagany" }).max(50),
  color: z.string().min(1, { message: "Kolor jest wymagany" }).max(50),
  productCategory: z.enum([
    "ceramicTiles",
    "bathroomEquipment",
    "accessories",
    "furniture",
    "lightning",
  ]),
  quantity: z.string(),
  additionalInfo: z.string(),
  contactPerson: z.string(),
  email: z.string().min(1, { message: "Producent jest wymagany" }).max(50),
  phone: z.string().min(1, { message: "Producent jest wymagany" }).max(50),
  files: z.string().optional(),
});

export const requestRequestSchema = z.object({
  requestTypes: z.array(
    z.enum([
      "price",
      "priceNet",
      "availability",
      "productionDate",
      "substitute",
      "technicalDocumentation",
    ])
  ),
  productCode: z
    .string()
    .min(1, { message: "Kod produktu jest wymagane" })
    .max(50),
  collectionName: z
    .string()
    .min(1, { message: "Nazwa produktu jest wymagana" })
    .max(50),
  width: z.string(),
  height: z.string(),
  thickness: z.string(),
  finish: z.string(),
  producer: z.string().min(1, { message: "Producent jest wymagany" }).max(50),
  color: z.string().min(1, { message: "Kolor jest wymagany" }).max(50),
  productCategory: z.enum([
    "ceramicTiles",
    "bathroomEquipment",
    "accessories",
    "furniture",
    "lightning",
  ]),
  quantity: z.string(),
  additionalInfo: z.string(),
  contactPerson: z.string().optional(),
  contactPersonEmail: z
    .string()
    .min(1, { message: "Producent jest wymagany" })
    .max(50)
    .optional(),
  contactPersonPhone: z
    .string()
    .min(1, { message: "Producent jest wymagany" })
    .max(50)
    .optional(),
  files: z.string().optional(),
  unit: z.enum(["szt", "m2", "komplet", "mb"]),
});

export const technicalRequestTypeSchema = z.array(
  z.object({
    technicalRequestType: z.object({
      typeId: z.number(),
      typeName: z.enum([
        "price",
        "purchasePrice",
        "availability",
        "productionDate",
        "substitute",
        "technicalDocumentation",
      ]),
    }),
  })
);

export const assigneesSchema = z.array(
  z.object({
    userAccount: z.object({
      userId: z.string(),
    }),
  })
);

export const technicalResponseRequestSchema = z.object({
  technicalRequestId: z.string(),
  technicalResponseText: z.string(),
  availability: z.string().nullable(),
  technicalDocumentation: z.string().nullable(),
  purchasePrice: z.string().nullable(),
  price: z.string().nullable(),
  substitute: z.string().nullable(),
  productionDate: z.string().nullable(),
});

export const technicalRequestResponseSchema = z.object({
  technicalRequestId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  requestTypes: technicalRequestTypeSchema,
  productCode: z
    .string()
    .min(1, { message: "Kod produktu jest wymagane" })
    .max(50),
  collectionName: z
    .string()
    .min(1, { message: "Nazwa produktu jest wymagana" })
    .max(50),
  width: z.string(),
  height: z.string(),
  thickness: z.string(),
  finish: z.string(),
  producer: z.string().min(1, { message: "Producent jest wymagany" }).max(50),
  color: z.string().min(1, { message: "Kolor jest wymagany" }).max(50),
  productCategory: z.enum([
    "ceramicTiles",
    "bathroomEquipment",
    "accessories",
    "furniture",
    "lightning",
  ]),
  quantity: z.string(),
  unit: z.enum(["m2", "szt", "mb", "komplet"]),
  additionalInfo: z.string(),
  contactPerson: z.string(),
  contactPersonEmail: z
    .string()
    .min(1, { message: "Producent jest wymagany" })
    .max(50),
  contactPersonPhone: z
    .string()
    .min(1, { message: "Producent jest wymagany" })
    .max(50),
  files: z.string().optional(),
  requestStatus: z.object({
    technicalRequestStatusName: z.enum([
      "notAssigned",
      "inProgress",
      "expired",
      "resolved",
      "canceled",
      "forwarded",
      "assigned",
    ]),
  }),
  resolvedAt: z.string(),
  expiresAt: z.string(),
  resolved: z.boolean(),
  assignees: z.array(
    z.object({
      userAccount: z.object({
        userId: z.string(),
      }),
    })
  ),
  technicalRequestResponse: technicalResponseRequestSchema,
  technicalRequestResolvedBy: z.object({
    userAccountId: z.string(),
  }),
});

const userAccountSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  password: z.string(),
  active: z.boolean(),
  activate_token: z.string(),
  activate_token_expire_date: z.number().positive(),
  created_at: z.string(), // Assuming it's a string representation of timestamp
  updated_at: z.string(), // Assuming it's a string representation of timestamp
  role: z.enum(["ADMIN"]), // Assuming only 'ADMIN' role is allowed
});

export type CartItemType = z.infer<typeof cartItemRequestSchema>;
export type CartItemResponseType = z.infer<typeof cartItemResponseSchema>;
export type CustomerType = z.infer<typeof customerSchema>;
export type ProductType = z.infer<typeof productSchema>;
export type RequestType = z.infer<typeof requestSchema>;
export type RequestRequestType = z.infer<typeof requestRequestSchema>;
export type TechnicalRequestResponseType = z.infer<
  typeof technicalRequestResponseSchema
>;
export type UserAccountType = z.infer<typeof userAccountSchema>;
export type TechnicalResponseRequestType = z.infer<
  typeof technicalResponseRequestSchema
>;

export type Assignees = z.infer<typeof assigneesSchema>;
export type UserToBeAssignedType = { email: string; userId: string };
