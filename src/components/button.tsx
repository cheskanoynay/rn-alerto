import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { tw } from "~/lib/tailwind";
import { Spinner } from "./spinner";

interface ButtonProps extends PressableProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { loading, children, style, disabled, wrapperStyle, ...rest } = props;

  return (
    <View style={[tw`h-12 overflow-hidden rounded-2xl`, wrapperStyle]}>
      <Pressable
        {...rest}
        style={(p) => [
          typeof style === "function" ? style(p) : style,
          tw`h-14 flex-1 flex-row items-center justify-center gap-1 rounded-2xl bg-persian-red-600 px-6 py-2`,
          p.pressed && tw`bg-persian-red-600/90`,
          disabled || loading ? tw`opacity-50` : tw``,
        ]}
        disabled={disabled || loading}
        android_ripple={{
          color: "#ffffff",
          borderless: true,
        }}
      >
        {(p) => {
          return (
            <>
              {loading && (
                <Spinner size={20} style={tw`text-white`} color="#ffffff" />
              )}

              {typeof children === "string" ? (
                <Text style={[tw`text-center text-white text-xs`]}>{children}</Text>
              ) : typeof children === "function" ? (
                children(p)
              ) : (
                children
              )}
            </>
          );
        }}
      </Pressable>
    </View>
  );
};

export { Button };
