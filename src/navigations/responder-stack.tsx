import React, { useEffect } from "react";
import {
  CompositeScreenProps,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import { ResponderHomeScreen } from "~/screens/responder/home";
import { LoginScreen } from "~/screens/responder/login";
import { MessagesScreen } from "~/screens/responder/messages";
import { NotificationsScreen } from "~/screens/responder/notifications";
import { ProfileScreen } from "~/screens/responder/profile";
import { TermsOfServiceScreen } from "~/screens/responder/terms-of-service";
import { useAppSelector } from "~/store";
import { RootStackParamList, RootStackScreenProps } from "./root-stack";

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

const Stack = createStackNavigator<ResponderStackParamList>();

const ResponderStack = () => {
  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData.role !== "responder") {
      StackActions.popToTop();
      navigation.navigate("User", { screen: "Login" });
    }
  }, [navigation, userData]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen name="Home" component={ResponderHomeScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
    </Stack.Navigator>
  );
};

export { ResponderStack };
