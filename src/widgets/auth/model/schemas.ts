import {
  string,
  object,
  minLength,
  regex,
  forward,
  pipe,
  email,
  check,
  boolean,
  optional,
  nonEmpty,
} from "valibot";

const ERROR_MESSAGES = {
  required: "form.requiredField",
  passwordLength: "form.min6characters",
  passwordContent: "form.shouldBeLetterAndDigit",
  passwordsMatch: "form.passwordsDoNotMatch",
  invalidEmail: "form.invalidEmail",
};
const emailSchema = pipe(
  string(ERROR_MESSAGES.required),
  email(ERROR_MESSAGES.invalidEmail)
);
const passwordSchema = pipe(
  string(ERROR_MESSAGES.required),
  minLength(6, ERROR_MESSAGES.passwordLength),
  regex(/^(?=.*\d)(?=.*[A-Z])/, ERROR_MESSAGES.passwordContent)
);

export const registerSchema = pipe(
  object({
    firstname: pipe(string(ERROR_MESSAGES.required), nonEmpty(ERROR_MESSAGES.required)),
    surname: optional(string(ERROR_MESSAGES.required)),
    companyName: optional(string()),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: string(ERROR_MESSAGES.required),
    termsAccepted: pipe(
      boolean(),
      check((value) => value === true, ERROR_MESSAGES.required)
    ),
  }),
  forward(
    check(
      ({ password, confirmPassword }) => password === confirmPassword,
      ERROR_MESSAGES.passwordsMatch
    ),
    ["confirmPassword"]
  )
);
export const setupProfileSchema = pipe(
  object({
    firstname: string(ERROR_MESSAGES.required),
    surname: string(ERROR_MESSAGES.required),
    companyName: optional(string()),
    termsAccepted: pipe(
      boolean(),
      check((value) => value === true, ERROR_MESSAGES.required)
    ),
  })
);
export const loginSchema = pipe(
  object({
    email: emailSchema,
    password: passwordSchema,
  })
);
export const forgotPasswordSchema = pipe(
  object({
    email: emailSchema,
  })
);
export const restorePasswordSchema = pipe(
  object({
    password: passwordSchema,
    confirmPassword: string(ERROR_MESSAGES.required),
  }),
  forward(
    check(
      ({ password, confirmPassword }) => password === confirmPassword,
      ERROR_MESSAGES.passwordsMatch
    ),
    ["confirmPassword"]
  )
);
