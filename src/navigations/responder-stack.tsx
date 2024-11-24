import React, { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ResponderHomeScreen } from "~/screens/responder/home";
import { LoginScreen } from "~/screens/responder/login";
import { MessagesScreen } from "~/screens/responder/messages";
import { NotificationsScreen } from "~/screens/responder/notifications";
import { ProfileScreen } from "~/screens/responder/profile";
import { TermsOfServiceScreen } from "~/screens/responder/terms-of-service";
import { useAppSelector } from "~/store";
import { ResponderStackParamList } from "./types";

const Stack = createStackNavigator<ResponderStackParamList>();

const ResponderNavigation = () => {
  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData.role !== "responder") {
      StackActions.popToTop();
      navigation.navigate("User", { screen: "Login" });
    }
  }, [navigation, userData]);

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
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

export default ResponderNavigation;
