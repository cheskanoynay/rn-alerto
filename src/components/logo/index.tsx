import React from "react";
import { Image, Text, View, ViewProps } from "react-native";

import { tw } from "~/lib/tailwind";

interface LogoProps extends ViewProps {
  hideText?: boolean;
}

const Logo = (props: LogoProps) => {
  const { style, hideText = false, ...rest } = props;

  return (
    <View {...rest} style={[tw`items-center justify-center`, style]}>
      <Image
        source={require("~/assets/images/logo.png")}
        style={tw`h-32 w-32`}
      />

      {!hideText && (
        <Text
          style={tw`font-kaisei-decol-medium text-3xl tracking-widest text-persian-red-600`}
        >
          ALERTO
        </Text>
      )}
    </View>
  );
};

export { Logo };
