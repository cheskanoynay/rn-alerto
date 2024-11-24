import { SendNotificationSchema } from "~/schema/notification";
import { getError } from "~/utils/error";
import { getRelativesByUserId, getUsersBy } from "./firebase/firestore";

export const sendNotification = async (data: SendNotificationSchema) => {
  try {
    switch (data.to) {
      case "admin": {
        const users = await getUsersBy({ role: "admin" });

        if (users.length === 0) throw new Error("Unable to get tokens.");

        const tokens = users.reduce(
          (p, c) => [...p, ...c.tokens],
          [] as string[],
        );

        if (tokens.length === 0) throw new Error("Users have no fcm token.");

        await fetch("https://next-alerto.vercel.app/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            tokens,
          }),
        })
          .then((r) => r.json())
          .then(console.log)
          .catch((error) => console.log("sendNotification error:", error));

        return true;
      }

      case "responders": {
        const users = await getUsersBy({ role: "responder" });

        if (users.length === 0) throw new Error("Unable to get tokens.");

        const tokens = users.reduce(
          (p, c) => [...p, ...c.tokens],
          [] as string[],
        );

        if (tokens.length === 0) throw new Error("Users have no fcm token.");

        await fetch("https://next-alerto.vercel.app/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            tokens,
          }),
        })
          .then((r) => r.json())
          .then(console.log)
          .catch((error) => console.log("sendNotification error:", error));

        return true;
      }

      case "all": {
        const users = await getUsersBy({ notRole: "user" });

        if (users.length === 0) throw new Error("Unable to get tokens.");

        const tokens = users.reduce(
          (p, c) => [...p, ...c.tokens],
          [] as string[],
        );

        if (tokens.length === 0) throw new Error("Users have no fcm token.");

        await fetch("https://next-alerto.vercel.app/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            tokens,
          }),
        })
          .then((r) => r.json())
          .then(console.log)
          .catch((error) => console.log("sendNotification error:", error));

        return true;
      }

      case "relatives": {
        const relatives = await getRelativesByUserId(data.from);
        const ids = relatives
          .reduce((p, c) => [...p, c.userId, c.relativeId], [] as string[])
          .filter((id) => id !== data.from);
        const users = await getUsersBy({ ids });

        if (users.length === 0) throw new Error("Unable to get tokens.");

        const tokens = users.reduce(
          (p, c) => [...p, ...c.tokens],
          [] as string[],
        );

        if (tokens.length === 0) throw new Error("Users have no fcm token.");

        await fetch("https://next-alerto.vercel.app/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            tokens,
          }),
        })
          .then((r) => r.json())
          .then(console.log)
          .catch((error) => console.log("sendNotification error:", error));

        return true;
      }

      default: {
        const users = await getUsersBy({ ids: data.to.split(",") });

        if (users.length === 0) throw new Error("Unable to get tokens.");

        const tokens = users.reduce(
          (p, c) => [...p, ...c.tokens],
          [] as string[],
        );

        if (tokens.length === 0) throw new Error("Users have no fcm token.");

        await fetch("https://next-alerto.vercel.app/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            tokens,
          }),
        })
          .then((r) => r.json())
          .then(console.log)
          .catch((error) => console.log("sendNotification error:", error));

        return true;
      }
    }
  } catch (error) {
    const err = getError(error, "Failed sending notification.");

    throw err;
  }
};
