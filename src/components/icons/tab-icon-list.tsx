import React from "react";
import { List } from "lucide-react-native";

import { cn } from "~/utils/style";

interface TabIconListProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconList = (props: TabIconListProps) => {
  const { focused } = props;

  return (
    <List
      className={cn("h-4 w-4 text-gray-600", focused && "text-persian-red-600")}
    />
  );
};

export { TabIconList };
