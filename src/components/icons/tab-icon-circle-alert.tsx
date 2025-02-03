import React from "react";
import { LucideCircleAlert } from "lucide-react-native";

interface TabIconCircleAlertProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconCircleAlert = (props: TabIconCircleAlertProps) => {
  const { focused } = props;

  return <LucideCircleAlert color={focused ? "#ca3433" : "#000000"} />;
};

export { TabIconCircleAlert };
