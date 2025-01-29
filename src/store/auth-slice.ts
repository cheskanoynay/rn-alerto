import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import _ from "lodash";

import { createUser, getUserBy } from "~/lib/firebase/firestore";
import {
  LoginFormInput,
  loginFormInputSchema,
  RegisterFormInput,
  registerFormInputSchema,
} from "~/schema/auth";
import { getError } from "~/utils/error";
import { generateKeywords } from "~/utils/string";

export const register = createAsyncThunk(
  "auth/register",
  async (params: RegisterFormInput, thunkApi) => {
    try {
      const { data, error } = registerFormInputSchema.safeParse(params);

      if (error) return thunkApi.rejectWithValue(error.issues[0].message);

      const { email, password, name } = data;

      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await createUser(user.uid, {
        email,
        name,
        barangay: "",
        birthdate: "",
        contact: "",
        gender: null,
        profile: "",
        town: "",
        role: "user",
        responderType: "",
        keywords: _.uniq([
          ...generateKeywords(name),
          ...generateKeywords(email),
        ]),
        tokens: [],
        status: "unconfirmed",
      });

      await auth().signOut();

      return null;
    } catch (error) {
      console.log("store/auth-slice/signup error:", error);
      const err = getError(error);

      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (params: LoginFormInput, thunkApi) => {
    try {
      const { data, error } = loginFormInputSchema.safeParse(params);

      if (error) return thunkApi.rejectWithValue(error.issues[0].message);

      const { email, password, role } = data;

      const userMaybe = await getUserBy({ email });

      if (!userMaybe)
        return thunkApi.rejectWithValue("User data does not exist.");
      if (userMaybe.role !== role)
        return thunkApi.rejectWithValue(`User is not a ${role}.`);
      if (userMaybe.status !== "confirmed")
        return thunkApi.rejectWithValue(
          userMaybe.status === "revoked"
            ? "User access is revoked."
            : "User is not yet confirmed.",
        );

      const { user } = await auth().signInWithEmailAndPassword(email, password);

      return user;
    } catch (error) {
      console.log("store/auth-slice/login error:", error);
      const err = getError(error);

      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_p, thunkApi) => {
  try {
    await auth().signOut();

    return true;
  } catch (error) {
    console.log("store/auth-slice/logout error:", error);
    const err = getError(error);

    return thunkApi.rejectWithValue(err.message);
  }
});

export interface AuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: SerializedError | null;
  status: "initial" | "fetching" | "fetched";
  type: "login" | "logout" | "register" | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: "initial",
  type: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload;
      state.status = "fetched";
    },
    resetUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.status = "initial";
      state.type = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.status = "fetching";
        state.type = "register";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.status = "fetching";
        state.type = "login";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.status = "fetching";
        state.type = "logout";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "fetched";
        state.type = null;
      });
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
