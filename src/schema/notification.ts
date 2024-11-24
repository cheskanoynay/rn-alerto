import { z } from "zod";

import { timestampDateSchema } from "./custom";

export const notificationSchema = z.object({
  id: z.string(),
  type: z.enum(["report", "message"]),
  typeId: z.string(),
  from: z.string(),
  to: z.string(),
  title: z.string(),
  body: z.string(),
  isRead: z.string().array(),
  dateCreated: timestampDateSchema,
  dateUpdated: timestampDateSchema,
});
export type NotificationSchema = z.infer<typeof notificationSchema>;

export const sendNotificationSchema = notificationSchema.pick({
  type: true,
  typeId: true,
  from: true,
  to: true,
  title: true,
  body: true,
});
export type SendNotificationSchema = z.infer<typeof sendNotificationSchema>;
