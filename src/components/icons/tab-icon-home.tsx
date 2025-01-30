import React from "react";
import { Home } from "lucide-react-native";

import { cn } from "~/utils/style";

interface TabIconHomeProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabIconHome = (props: TabIconHomeProps) => {
  const { focused } = props;

  return (
    <Home
      className={cn("h-4 w-4 text-gray-600", focused && "text-persian-red-600")}
    />
  );
};

export { TabIconHome };
