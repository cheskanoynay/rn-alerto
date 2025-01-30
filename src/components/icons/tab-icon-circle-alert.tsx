import React from "react";
import { CircleAlert } from "lucide-react-native";

import { cn } from "~/utils/style";

interface TabIconCircleAlertProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconCircleAlert = (props: TabIconCircleAlertProps) => {
  const { focused } = props;

  return (
    <CircleAlert
      className={cn("h-4 w-4 text-gray-600", focused && "text-persian-red-600")}
    />
  );
};

export { TabIconCircleAlert };
