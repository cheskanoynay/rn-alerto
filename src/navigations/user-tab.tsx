import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

import { TabIconBell } from "~/components/icons/tab-icon-bell";
import { TabIconCircleAlert } from "~/components/icons/tab-icon-circle-alert";
import { TabIconHome } from "~/components/icons/tab-icon-home";
import { TabIconList } from "~/components/icons/tab-icon-list";
import { TabIconMenu } from "~/components/icons/tab-icon-menu";
import { ActivitiesScreen } from "~/screens/user/user-tab/activities";
import { HomeScreen } from "~/screens/user/user-tab/home";
import { MenuScreen } from "~/screens/user/user-tab/menu";
import { NotificationsScreen } from "~/screens/user/user-tab/notifications";
import { ReportScreen } from "~/screens/user/user-tab/report";
import { UserStackParamList, UserStackScreenProps } from "./user-stack";

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: TabIconHome, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{ tabBarIcon: TabIconList, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{ tabBarIcon: TabIconCircleAlert, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarIcon: TabIconBell, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ tabBarIcon: TabIconMenu, tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};

export { UserTab };
