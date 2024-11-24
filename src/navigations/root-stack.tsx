import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "~/screens/home";
import { SplashScreen } from "~/screens/splash";
import { useAppSelector } from "~/store";
import ResponderNavigation from "./responder-stack";
import { RootStackParamList } from "./types";
import UserNavigation from "./user-stack";

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { userData } = useAppSelector((state) => state.user);

  return (
    <Stack.Navigator
      id="RootStack"
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!userData && <Stack.Screen name="Home" component={HomeScreen} />}
      <Stack.Screen name="User" component={UserNavigation} />
      <Stack.Screen name="Responders" component={ResponderNavigation} />
    </Stack.Navigator>
  );
};

export { RootStack };
