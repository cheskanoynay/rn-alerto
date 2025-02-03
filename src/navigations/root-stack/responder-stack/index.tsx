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

import { ResponderHomeScreen } from "~/screens/responder-stack/home";
import { LoginScreen } from "~/screens/responder-stack/login";
import { MessagesScreen } from "~/screens/responder-stack/messages";
import { NotificationsScreen } from "~/screens/responder-stack/responder-tab/notifications";
import { ProfileScreen } from "~/screens/responder-stack/profile";
import { TermsOfServiceScreen } from "~/screens/responder-stack/terms-of-service";
import { useAppSelector } from "~/store";
import { RootStackParamList, RootStackScreenProps } from "..";
import { ResponderTab, ResponderTabParamList } from "./responder-tab";

export type ResponderStackParamList = {
  ResponderTab: NavigatorScreenParams<ResponderTabParamList>;
  Login: undefined;
  Messages: { id: string };
  TermsOfService: undefined;
  Profile: undefined;
};
export type ResponderStackScreenProps<T extends keyof ResponderStackParamList> =
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
      navigation.navigate("UserStack", { screen: "Login" });
    }
  }, [navigation, userData]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen name="ResponderTab" component={ResponderTab} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
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
