import React from "react";
import { Menu } from "lucide-react-native";

import { cn } from "~/utils/style";

interface TabIconMenuProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconMenu = (props: TabIconMenuProps) => {
  const { focused } = props;

  return (
    <Menu
      className={cn("h-4 w-4 text-gray-600", focused && "text-persian-red-600")}
    />
  );
};

export { TabIconMenu };
