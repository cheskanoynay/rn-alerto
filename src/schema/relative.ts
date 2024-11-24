import { z } from "zod";

import { timestampDateSchema } from "./custom";

export const relativeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  relativeId: z.string(),
  relationship: z.string(),
  dateCreated: timestampDateSchema,
  dateUpdated: timestampDateSchema,
});
export type RelativeSchema = z.infer<typeof relativeSchema>;
