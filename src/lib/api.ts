import { z } from "zod";

import { SendNotificationSchema } from "~/schema/notification";
import { getError } from "~/utils/error";

export const sendNotification = async (data: SendNotificationSchema) => {
  try {
    const result = await fetch(
      "https://next-alerto.vercel.app/api/send-notification",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ).then((r) => r.json());

    const { error } = z.object({ success: z.boolean() }).safeParse(result);

    if (error) throw new Error(error.issues[0].message);

    return true;
  } catch (error) {
    const err = getError(error, "Failed sending notification.");

    throw err;
  }
};
