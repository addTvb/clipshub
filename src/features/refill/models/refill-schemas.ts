import { object, string, nonEmpty, email, minValue, number, pipe } from "valibot";

export const paypalSchema = object({
  amount: pipe(number("form.requiredField"), minValue(0.01, "form.minAmount")),
  email: pipe(string("form.requiredField"), nonEmpty("form.requiredField"), email("form.invalidEmail")),
  country: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  city: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  billingAddress: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  postalCode: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
});

export const cardsSchema = object({
  amount: pipe(number("form.requiredField"), minValue(1, "form.minAmount")),
  // country: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  // city: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  // billingAddress: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
  // postalCode: pipe(string("form.requiredField"), nonEmpty("form.requiredField")),
});

// TypeScript типы на основе схем
export interface PaypalFormData {
  amount: number;
  email: string;
  country: string;
  city: string;
  billingAddress: string;
  postalCode: string;
}

export interface CardsFormData {
  amount: number;
  // country: string;
  // city: string;
  // billingAddress: string;
  // postalCode: string;
} 