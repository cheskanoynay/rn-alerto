import React from "react";
import { Home } from "lucide-react-native";

interface TabIconHomeProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconHome = (props: TabIconHomeProps) => {
  const { focused } = props;

  return <Home color={focused ? "#ca3433" : "#000000"} />;
};

export { TabIconHome };
