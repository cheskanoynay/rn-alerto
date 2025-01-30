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
import { AudioCallScreen } from "~/screens/user/audio-call";
import { LoginScreen } from "~/screens/user/login";
import { MessagesScreen } from "~/screens/user/messages";
import { PreRegistrationScreen } from "~/screens/user/pre-registration";
import { RegistrationScreen } from "~/screens/user/registration";
import { TermsOfServiceScreen } from "~/screens/user/terms-of-service";
import { VideoCallScreen } from "~/screens/user/video-call";
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
    </Stack.Navigator>
  );
};

export { UserStack };
