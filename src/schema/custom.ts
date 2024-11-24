import { Timestamp } from "@react-native-firebase/firestore";
import { z } from "zod";

export const timestampDateSchema = z
  .instanceof(Timestamp)
  .or(z.instanceof(Date))
  .transform((v) => (v instanceof Timestamp ? v.toDate() : v));
export type TimestampDate = z.infer<typeof timestampDateSchema>;
