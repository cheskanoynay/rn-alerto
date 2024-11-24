import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootStack } from "./root-stack";

const Navigations = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export { Navigations };
