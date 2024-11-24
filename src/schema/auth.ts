import { z } from "zod";

import { userRoleSchema } from "./user";

export const registerFormInputSchema = z.object({
  name: z.string().min(1, "Fullname is required."),
  email: z.string().email("Email address is invalid."),
  password: z.string().min(8, "Password should be at least 8 characters long."),
});
export type RegisterFormInput = z.infer<typeof registerFormInputSchema>;

export const loginFormInputSchema = z.object({
  email: z.string().email("Email address is invalid."),
  password: z.string().min(8, "Password should be at least 8 characters long."),
  role: userRoleSchema,
});
export type LoginFormInput = z.infer<typeof loginFormInputSchema>;
