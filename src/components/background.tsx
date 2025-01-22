import React, { ReactNode } from "react";
import { Image, StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { tw } from "~/lib/tailwind";

interface BackgroundProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  gradient?: boolean;
}

const Background = (props: BackgroundProps) => {
  const { children, style, gradient = true } = props;

  return (
    <>
      <Image
        source={require("~/assets/images/logo.png")}
        style={[
          tw`absolute left-1/2 top-1/2`,
          {
            width: 512,
            height: 512,
            transform: [{ translateX: -256 }, { translateY: -256 }],
          },
        ]}
      />

      <LinearGradient
        style={[tw`h-full w-full`, style]}
        colors={
          gradient
            ? ["#fe877af2", "#fd9f92f2", "#fad0c4f2"]
            : ["#fffffff2", "#fffffff2"]
        }
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
    </>
  );
};

export { Background };
