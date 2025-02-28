import { z } from "zod";

const MAX_AGE = 79;

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-ZäöüßÄÖÜ]+$/, "Only Latin and German letters allowed")
    .max(50),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-ZäöüßÄÖÜ\s]+$/, "Only Latin and German letters allowed")
    .max(100),
  dateOfBirth: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age <= MAX_AGE;
  }, `Maximum age is ${MAX_AGE} years`),
});

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

export const financialInfoSchema = z.object({
  monthlySalary: z.number().positive("Monthly salary must be positive"),
  hasAdditionalIncome: z.boolean(),
  additionalIncome: z.number().optional(),
  hasMortgage: z.boolean(),
  mortgage: z.number().optional(),
  hasOtherCredits: z.boolean(),
  otherCredits: z.number().optional(),
});
