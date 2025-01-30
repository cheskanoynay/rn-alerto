import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import { HomeScreen } from "~/screens/home";
import { SplashScreen } from "~/screens/splash";
import { useAppSelector } from "~/store";
import { ResponderStack, ResponderStackParamList } from "./responder-stack";
import { UserStack, UserStackParamList } from "./user-stack";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  UserStack: NavigatorScreenParams<UserStackParamList>;
  ResponderStack: NavigatorScreenParams<ResponderStackParamList>;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { userData } = useAppSelector((state) => state.user);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!userData && <Stack.Screen name="Home" component={HomeScreen} />}
      <Stack.Screen name="UserStack" component={UserStack} />
      <Stack.Screen name="ResponderStack" component={ResponderStack} />
    </Stack.Navigator>
  );
};

export { RootStack };
