import { ZodError } from "zod";

export const FIREBASE_SERVICE_REGEX = /(app|auth|firestore|storage)\//g;

export const getError = (error: unknown, message?: string) => {
  const errorMessage = message ?? "An unknown error occured.";

  if (error instanceof ZodError)
    return new Error(error.issues[0].message || errorMessage);
  else if (error instanceof Error)
    return new Error(error.message || errorMessage);
  else if (
    error instanceof Object &&
    "message" in error &&
    typeof error.message === "string"
  )
    return new Error(error.message);
  else if (typeof error === "string") return new Error(error || errorMessage);
  else return new Error(errorMessage);
};
