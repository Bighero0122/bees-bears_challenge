import { z } from "zod";

const MAX_AGE = 79;

export const contactDetailsSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Phone must be in E.164 format (e.g., +1234567890)"
    ),
});

export const loanRequestSchema = z
  .object({
    loanAmount: z
      .number()
      .min(10000, "Minimum loan amount is 10,000")
      .max(70000, "Maximum loan amount is 70,000"),
    upfrontPayment: z.number().min(0, "Upfront payment cannot be negative"),
    terms: z
      .number()
      .min(10, "Minimum term is 10 months")
      .max(30, "Maximum term is 30 months"),
  })
  .refine((data) => data.upfrontPayment < data.loanAmount, {
    message: "Upfront payment must be less than loan amount",
    path: ["upfrontPayment"],
  });
