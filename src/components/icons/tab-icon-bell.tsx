import React from "react";
import { Bell } from "lucide-react-native";

import { cn } from "~/utils/style";

interface TabIconBellProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconBell = (props: TabIconBellProps) => {
  const { focused } = props;

  return (
    <Bell
      className={cn("h-4 w-4 text-gray-600", focused && "text-persian-red-600")}
    />
  );
};

export { TabIconBell };
