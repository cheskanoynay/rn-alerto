import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { tw } from "~/lib/tailwind";

interface BackgroundProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Background = (props: BackgroundProps) => {
  const { children, style } = props;

  return (
    <LinearGradient
      style={[tw`h-full w-full`, style]}
      colors={["#fe877a", "#fd9f92", "#fad0c4"]}
      start={{
        x: 0.5,
        y: 0,
      }}
      end={{
        x: 0.5,
        y: 1,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export { Background };
