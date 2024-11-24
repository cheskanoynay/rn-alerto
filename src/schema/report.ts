import { z } from "zod";

import { timestampDateSchema } from "./custom";

export const reportTypeSchema = z.enum(["video", "voice", "message"]);
export type ReportTypeSchema = z.infer<typeof reportTypeSchema>;

export const reportStatusSchema = z.enum(["pending", "responded"]);
export type ReportStatusSchema = z.infer<typeof reportStatusSchema>;

export const reportAgencySchema = z.enum(["police", "medical", "fire"]);
export type ReportAgencySchema = z.infer<typeof reportAgencySchema>;

export const reportSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: reportTypeSchema,
  status: reportStatusSchema,
  agency: reportAgencySchema,
  latitude: z.number(),
  longitude: z.number(),
  dateCreated: timestampDateSchema,
  dateUpdated: timestampDateSchema,
});
export type ReportSchema = z.infer<typeof reportSchema>;
