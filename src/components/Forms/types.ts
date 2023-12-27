import { z } from "zod";

export const InputsSchema = z.object({
  companyName: z.string(),
  street: z.string(),
  number: z.string(),
  apartmentNo: z.string(),
  city: z.string(),
  postalCode: z.string(),
  vatNo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  contactNumber: z.string(),
  email: z.string().email(), // Assuming email should be a valid email address
});

export type InputsType = z.infer<typeof InputsSchema>;
