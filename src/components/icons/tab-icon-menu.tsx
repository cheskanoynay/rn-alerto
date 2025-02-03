import React from "react";
import { LucideMenu } from "lucide-react-native";

interface TabIconMenuProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconMenu = (props: TabIconMenuProps) => {
  const { focused } = props;
  console.log(focused);

  return <LucideMenu color={focused ? "#ca3433" : "#000000"} />;
};

export { TabIconMenu };
