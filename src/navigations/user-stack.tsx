import React, { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AddRelativesScreen } from "~/screens/user/add-relatives";
import { AudioCallScreen } from "~/screens/user/audio-call";
import { HistoryScreen } from "~/screens/user/history";
import { UserHomeScreen } from "~/screens/user/home";
import { LoginScreen } from "~/screens/user/login";
import { MessagesScreen } from "~/screens/user/messages";
import { NotificationsScreen } from "~/screens/user/notifications";
import { PreRegistrationScreen } from "~/screens/user/pre-registration";
import { ProfileScreen } from "~/screens/user/profile";
import { RegistrationScreen } from "~/screens/user/registration";
import { RelativesScreen } from "~/screens/user/relatives";
import { ReportScreen } from "~/screens/user/report";
import { TermsOfServiceScreen } from "~/screens/user/terms-of-service";
import { VideoCallScreen } from "~/screens/user/video-call";
import { useAppSelector } from "~/store";
import { UserStackParamList } from "./types";

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigation = () => {
  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData.role !== "user") {
      StackActions.popToTop();
      navigation.navigate("Responders", { screen: "Login" });
    }
  }, [navigation, userData]);

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen name="Home" component={UserHomeScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="VideoCall" component={VideoCallScreen} />
          <Stack.Screen name="AudioCall" component={AudioCallScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Relatives" component={RelativesScreen} />
          <Stack.Screen name="AddRelatives" component={AddRelativesScreen} />
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
    </Stack.Navigator>
  );
};

export default UserNavigation;
