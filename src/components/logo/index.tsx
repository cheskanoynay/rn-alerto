import React from "react";
import { Image, Text, View, ViewProps } from "react-native";

import { cn } from "~/utils/style";

interface LogoProps extends ViewProps {
  hideText?: boolean;
}

const Logo = (props: LogoProps) => {
  const { className, hideText = false, ...rest } = props;

  return (
    <View {...rest} className={cn("items-center justify-center", className)}>
      <Image
        source={require("~/assets/images/logo.png")}
        className="h-32 w-32"
      />

      {!hideText && (
        <Text className="font-kaisei-decol-medium text-3xl tracking-widest text-persian-red-600">
          ALERTO
        </Text>
      )}

      <Text className="text-center text-persian-red-600 text-lg">
        An Emergency Response Mobile Application
      </Text>
    </View>
  );
};

export { Logo };
