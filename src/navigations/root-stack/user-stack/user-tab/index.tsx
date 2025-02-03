import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

import "nativewind";

import { TabIconBell } from "~/components/icons/tab-icon-bell";
import { TabIconCircleAlert } from "~/components/icons/tab-icon-circle-alert";
import { TabIconHome } from "~/components/icons/tab-icon-home";
import { TabIconMenu } from "~/components/icons/tab-icon-menu";
import { HomeScreen } from "~/screens/user-stack/user-tab/home";
import { MenuScreen } from "~/screens/user-stack/user-tab/menu";
import { NotificationsScreen } from "~/screens/user-stack/user-tab/notifications";
import { ReportScreen } from "~/screens/user-stack/user-tab/report";
import { UserStackParamList, UserStackScreenProps } from "..";

export type UserTabParamList = {
  Home: undefined;
  Activities: undefined;
  Report: undefined;
  Notifications: undefined;
  Menu: undefined;
};
export type UserTabScreenProps<T extends keyof UserTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<UserTabParamList, T>,
    UserStackScreenProps<keyof UserStackParamList>
  >;

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: TabIconHome }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{ tabBarIcon: TabIconCircleAlert }}
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

export { UserTab };
