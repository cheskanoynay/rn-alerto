import React, { ReactNode } from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { cn } from "~/utils/style";

interface BackgroundProps {
  className?: string;
  children?: ReactNode;
  gradient?: boolean;
}

const Background = (props: BackgroundProps) => {
  const { className, children, gradient = true } = props;

  return (
    <>
      <Image
        className="absolute left-1/2 top-1/2 h-[512px] w-[512px] -translate-x-1/2 -translate-y-1/2"
        source={require("~/assets/images/logo.png")}
      />

      <LinearGradient
        className={cn("h-full w-full", className)}
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
