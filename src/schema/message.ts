import { z } from "zod";

import { timestampDateSchema } from "./custom";

export const messageSchema = z.object({
  id: z.string(),
  reportId: z.string(),
  senderId: z.string(),
  senderType: z.enum(["user", "responder"]),
  text: z.string(),
  video: z.string(),
  image: z.string(),
  audio: z.string(),
  dateCreated: timestampDateSchema,
  dateUpdated: timestampDateSchema,
});
export type MessageSchema = z.infer<typeof messageSchema>;
