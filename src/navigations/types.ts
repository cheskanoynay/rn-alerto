import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { ResponderTypeSchema } from "~/schema/user";

// root
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  User: NavigatorScreenParams<UserStackParamList>;
  Responders: NavigatorScreenParams<ResponderStackParamList>;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// user
export type UserStackParamList = {
  Home: undefined;
  Report: { type: Exclude<ResponderTypeSchema, ""> };
  Messages: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  VideoCall: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  AudioCall: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  Notifications: undefined;
  History: undefined;
  PreRegistration: undefined;
  Registration: undefined;
  Login: undefined;
  TermsOfService: undefined;
  Profile: undefined;
  Relatives: undefined;
  AddRelatives: undefined;
};
export type UserStackScreenProps<T extends keyof UserStackParamList> =
  CompositeScreenProps<
    StackScreenProps<UserStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// responder
export type ResponderStackParamList = {
  Home: undefined;
  Login: undefined;
  Messages: { id: string };
  TermsOfService: undefined;
  Profile: undefined;
  Notifications: undefined;
};
export type ResponderStackSreenProps<T extends keyof ResponderStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ResponderStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
