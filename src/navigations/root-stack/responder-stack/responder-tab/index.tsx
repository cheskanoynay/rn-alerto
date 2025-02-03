import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

import { TabIconBell } from "~/components/icons/tab-icon-bell";
import { TabIconHome } from "~/components/icons/tab-icon-home";
import { TabIconMenu } from "~/components/icons/tab-icon-menu";
import { HomeScreen } from "~/screens/responder-stack/responder-tab/home";
import { MenuScreen } from "~/screens/responder-stack/responder-tab/menu";
import { NotificationsScreen } from "~/screens/responder-stack/responder-tab/notifications";
import { ResponderStackParamList, ResponderStackScreenProps } from "..";

export type ResponderTabParamList = {
  Home: undefined;
  Notifications: undefined;
  Menu: undefined;
};
export type ResponderTabScreenProps<T extends keyof ResponderTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ResponderTabParamList, T>,
    ResponderStackScreenProps<keyof ResponderStackParamList>
  >;

const Tab = createBottomTabNavigator<ResponderTabParamList>();

const ResponderTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: TabIconHome }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarIcon: TabIconBell }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ tabBarIcon: TabIconMenu }}
      />
    </Tab.Navigator>
  );
};

export { ResponderTab };
