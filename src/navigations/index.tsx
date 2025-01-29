import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootStack, RootStackParamList } from "./root-stack";

const Navigations = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export { Navigations };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
