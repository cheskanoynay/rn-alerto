import React from "react";
import { LucideHistory } from "lucide-react-native";

interface TabIconHistoryProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconHistory = (props: TabIconHistoryProps) => {
  const { focused } = props;

  return <LucideHistory color={focused ? "#ca3433" : "#000000"} />;
};

export { TabIconHistory };
