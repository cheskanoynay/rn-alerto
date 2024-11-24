import { z } from "zod";

import { timestampDateSchema } from "./custom";

export const userRoleSchema = z.enum(["responder", "user", "admin"]);
export type UserRoleSchema = z.infer<typeof userRoleSchema>;

export const responderTypeSchema = z.enum(["police", "medical", "fire", ""]);
export type ResponderTypeSchema = z.infer<typeof responderTypeSchema>;

export const userStatusSchema = z.enum(["unconfirmed", "confirmed", "revoked"]);
export type UserStatusSchema = z.infer<typeof userStatusSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1, "Name is required."),
  birthdate: z.string(),
  gender: z.enum(["male", "female"]).nullable(),
  contact: z.string(),
  barangay: z.string(),
  town: z.string(),
  profile: z.string(),
  role: userRoleSchema,
  responderType: responderTypeSchema,
  tokens: z.string().array(),
  keywords: z.string().array(),
  status: userStatusSchema,
  dateCreated: timestampDateSchema,
  dateUpdated: timestampDateSchema,
});
export type UserSchema = z.infer<typeof userSchema>;
