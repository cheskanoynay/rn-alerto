import firestore, { Filter, Timestamp } from "@react-native-firebase/firestore";

import { messageSchema, MessageSchema } from "~/schema/message";
import { relativeSchema, RelativeSchema } from "~/schema/relative";
import {
  ReportAgencySchema,
  reportSchema,
  ReportSchema,
  ReportStatusSchema,
} from "~/schema/report";
import { UserRoleSchema, UserSchema, userSchema } from "~/schema/user";
import { getError } from "~/utils/error";

export const USERS_COLLECTION = firestore().collection<UserSchema>("users");
export const REPORTS_COLLECTION =
  firestore().collection<ReportSchema>("reports");
export const MESSAGES_COLLECTION =
  firestore().collection<MessageSchema>("messages");
export const RELATIVES_COLLECTION =
  firestore().collection<RelativeSchema>("relatives");

/**
 * USERS
 */
export const createUser = async (
  id: string,
  data: Omit<UserSchema, "id" | "dateCreated" | "dateUpdated">,
) => {
  try {
    const ref = USERS_COLLECTION.doc(id);

    await ref.set({
      id,
      ...data,
      dateCreated: Timestamp.now(),
      dateUpdated: Timestamp.now(),
    });

    return ref.id;
  } catch (error) {
    console.log("createUser error:", error);
    const err = getError(error, "Failed creating user data.");

    throw err;
  }
};

export const updateUser = async (
  id: string,
  data: Partial<Omit<UserSchema, "id" | "dateCreated" | "dateUpdated">>,
) => {
  try {
    await USERS_COLLECTION.doc(id).update({
      ...data,
      dateUpdated: new Date(),
    });

    return true;
  } catch (error) {
    console.log("updateUser error:", error);
    const err = getError(error, "Failed updating user data.");

    throw err;
  }
};

export const getUserBy = async (params?: { email?: string }) => {
  try {
    const { email } = params ?? {};

    let query = USERS_COLLECTION.where("id", "!=", "").limit(1);

    if (email) query = query.where("email", "==", email);

    const snapshot = await query.get();
    const userMaybe = snapshot.docs.map((d) => d.data())[0];

    if (!userMaybe) return null;

    const { data, error } = userSchema.safeParse(userMaybe);

    if (error) throw error.issues[0].message;

    return data;
  } catch (error) {
    console.log("getUsers error:", error);
    const err = getError(error, "Failed getting user data.");

    throw err;
  }
};

export const getUserRealtime =
  (id: string | undefined) => (callback: (user: UserSchema | null) => void) =>
    USERS_COLLECTION.doc(id).onSnapshot((s) => {
      const { data, error } = userSchema.safeParse(s.data());

      if (error) console.log("getUserRealtime error:", error);

      callback(data ?? null);
    });

export const getUsersBy = async (params?: {
  ids?: string[];
  keyword?: string;
  role?: UserRoleSchema;
  roles?: UserRoleSchema[];
}) => {
  const { ids, keyword, role, roles } = params ?? {};

  let query = USERS_COLLECTION.where("id", "!=", "");

  if (ids && ids.length > 0) query = query.where("id", "in", ids);
  if (keyword && keyword.length > 0)
    query = query.where("keywords", "array-contains", keyword);
  if (role && !roles) query = query.where("role", "==", role);
  if (roles && roles.length > 0) query = query.where("role", "in", roles);

  const result = await query.get();

  const { data, error } = userSchema
    .array()
    .safeParse(result.docs.map((d) => d.data()));

  if (error) console.log("getUsersBy error:", error);

  return data ?? [];
};

export const getUsersByRealtime =
  (params?: { ids?: string[]; keyword?: string; role?: UserRoleSchema }) =>
  (callback: (users: UserSchema[]) => void) => {
    const { ids, keyword, role } = params ?? {};

    let query = USERS_COLLECTION.where("id", "!=", "");

    if (ids && ids.length > 0) query = query.where("id", "in", ids);
    if (keyword && keyword.length > 0)
      query = query.where("keywords", "array-contains", keyword);
    if (role) query = query.where("role", "==", role);

    return query.onSnapshot((snapshot) => {
      const { data, error } = userSchema
        .array()
        .safeParse(snapshot.docs.map((d) => d.data()));

      if (error) console.log("getUsersByRealtime error:", error);

      callback(data ?? []);
    });
  };

/**
 * REPORTS
 */
export const createReport = async (
  data: Omit<ReportSchema, "id" | "dateCreated" | "dateUpdated">,
) => {
  try {
    const ref = REPORTS_COLLECTION.doc();

    await ref.set({
      id: ref.id,
      ...data,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    });

    return ref.id;
  } catch (error) {
    console.log("createReport error:", error);
    const err = getError(error, "Failed creating report.");

    throw err;
  }
};

export const getReportsByRealtime =
  (params?: {
    userId?: string;
    status?: ReportStatusSchema;
    agency?: ReportAgencySchema;
  }) =>
  (callback: (reports: ReportSchema[]) => void) => {
    const { userId, status, agency } = params ?? {};

    let query = REPORTS_COLLECTION.where("id", "!=", "");

    if (userId) query = query.where("userId", "==", userId);
    if (status) query = query.where("status", "==", status);
    if (agency) query = query.where("agency", "==", agency);

    return query.onSnapshot((snapshot) => {
      const { data, error } = reportSchema
        .array()
        .safeParse(snapshot.docs.map((d) => d.data()));

      if (error) console.log("getReportsByRealtime error:", error);

      callback(data ?? []);
    });
  };

/**
 * MESSAGES
 */
export const createMessage = async (
  data: Omit<MessageSchema, "id" | "dateCreated" | "dateUpdated">,
) => {
  try {
    const ref = MESSAGES_COLLECTION.doc();

    await ref.set({
      id: ref.id,
      ...data,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    });

    return ref.id;
  } catch (error) {
    console.log("createMessage error:", error);
    const err = getError(error, "Failed creating message.");

    throw err;
  }
};

export const getMessagesByRealtime =
  (params?: { reportId?: string }) =>
  (callback: (messages: MessageSchema[]) => void) => {
    const { reportId } = params ?? {};

    let query = MESSAGES_COLLECTION.where("id", "!=", "");

    if (reportId) query = query.where("reportId", "==", reportId);

    return query.onSnapshot((snapshot) => {
      const { data, error } = messageSchema
        .array()
        .safeParse(snapshot.docs.map((d) => d.data()));

      if (error) console.log("getMessagesByRealtime error:", error);

      callback(data ?? []);
    });
  };

export const createRelative = async (
  data: Omit<RelativeSchema, "id" | "dateCreated" | "dateUpdated">,
) => {
  try {
    const ref = RELATIVES_COLLECTION.doc();

    await ref.set({
      id: ref.id,
      ...data,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    });

    return ref.id;
  } catch (error) {
    console.log("createRelative error:", error);
    const err = getError(error, "Failed creating relative.");

    throw err;
  }
};

export const getRelativesByUserId = async (userId: string) => {
  try {
    const result = await RELATIVES_COLLECTION.where(
      Filter.or(
        Filter("userId", "==", userId),
        Filter("relativeId", "==", userId),
      ),
    ).get();

    const { data, error } = relativeSchema
      .array()
      .safeParse(result.docs.map((d) => d.data()));

    if (error) {
      throw new Error(error.issues[0].message);
    }

    return data;
  } catch (error) {
    console.log("getRelativesByUserId error:", error);
    const err = getError(error, "Failed getting relatives.");

    throw err;
  }
};

export const getRelativesByUserIdRealtime =
  (userId: string) => (callback: (relatives: RelativeSchema[]) => void) => {
    return RELATIVES_COLLECTION.where(
      Filter.or(
        Filter("userId", "==", userId),
        Filter("relativeId", "==", userId),
      ),
    ).onSnapshot((snapshot) => {
      const { data, error } = relativeSchema
        .array()
        .safeParse(snapshot.docs.map((d) => d.data()));

      if (error) {
        console.log("getRelativesByUserIdRealtime error:", error);
        return callback([]);
      }

      callback(data);
    });
  };
