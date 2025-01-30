import React from "react";
import { Bell } from "lucide-react-native";

interface TabIconBellProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconBell = (props: TabIconBellProps) => {
  const { focused } = props;

  return <Bell color={focused ? "#ca3433" : "#000000"} />;
};

export { TabIconBell };
