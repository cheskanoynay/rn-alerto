import React, { useEffect } from "react";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import { ResponderTypeSchema } from "~/schema/user";
import { ActivitiesScreen } from "~/screens/user-stack/activities";
import { AddRelativesScreen } from "~/screens/user-stack/add-relatives";
import { AudioCallScreen } from "~/screens/user-stack/audio-call";
import { LoginScreen } from "~/screens/user-stack/login";
import { MessagesScreen } from "~/screens/user-stack/messages";
import { PreRegistrationScreen } from "~/screens/user-stack/pre-registration";
import { ProfileScreen } from "~/screens/user-stack/profile";
import { RegistrationScreen } from "~/screens/user-stack/registration";
import { RelativesScreen } from "~/screens/user-stack/relatives";
import { ReportTypeScreen } from "~/screens/user-stack/report-type";
import { TermsOfServiceScreen } from "~/screens/user-stack/terms-of-service";
import { VideoCallScreen } from "~/screens/user-stack/video-call";
import { useAppSelector } from "~/store";
import { RootStackParamList, RootStackScreenProps } from "..";
import { UserTab, UserTabParamList } from "./user-tab";

export type UserStackParamList = {
  UserTab: NavigatorScreenParams<UserTabParamList>;
  PreRegistration: undefined;
  Registration: undefined;
  Login: undefined;
  TermsOfService: undefined;
  Messages: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  VideoCall: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  AudioCall: { id: string; type: Exclude<ResponderTypeSchema, ""> };
  Profile: undefined;
  Activities: undefined;
  ReportType: { type: Exclude<ResponderTypeSchema, ""> };
  Relatives: undefined;
  AddRelatives: undefined;
};
export type UserStackScreenProps<T extends keyof UserStackParamList> =
  CompositeScreenProps<
    StackScreenProps<UserStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Stack = createStackNavigator<UserStackParamList>();

const UserStack = () => {
  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData.role !== "user") {
      StackActions.popToTop();
      navigation.navigate("ResponderStack", { screen: "Login" });
    }
  }, [navigation, userData]);

  console.log(userData);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen name="UserTab" component={UserTab} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="PreRegistration"
            component={PreRegistrationScreen}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      <Stack.Screen name="AudioCall" component={AudioCallScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="ReportType" component={ReportTypeScreen} />
      <Stack.Screen name="Relatives" component={RelativesScreen} />
      <Stack.Screen name="AddRelatives" component={AddRelativesScreen} />
    </Stack.Navigator>
  );
};

export { UserStack };
