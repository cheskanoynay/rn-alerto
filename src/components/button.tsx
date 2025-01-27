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
  size?: "base" | "sm";
  color?: "default" | "green" | "gray";
}

const Button = (props: ButtonProps) => {
  const {
    loading,
    children,
    style,
    disabled,
    wrapperStyle,
    size = "base",
    color = "default",
    ...rest
  } = props;

  return (
    <View
      style={[
        tw`overflow-hidden rounded-2xl`,
        wrapperStyle,
        size === "base" && tw`h-16`,
        size === "sm" && tw`h-14`,
      ]}
    >
      <Pressable
        {...rest}
        style={(p) => [
          size === "base" &&
            tw`h-16 flex-1 flex-row items-center justify-center gap-1 rounded-2xl px-6 py-2`,
          size === "sm" &&
            tw`h-14 flex-1 flex-row items-center justify-center gap-1 rounded-2xl px-4 py-1 text-xs`,
          color === "default" && tw`bg-persian-red-600`,
          color === "green" && tw`bg-green-600`,
          color === "gray" && tw`bg-gray-600`,
          p.pressed && color === "default" && tw`bg-persian-red-600/90`,
          p.pressed && color === "green" && tw`bg-green-600/90`,
          p.pressed && color === "gray" && tw`bg-gray-600/90`,
          disabled || loading ? tw`opacity-50` : tw``,
          typeof style === "function" ? style(p) : style,
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
                <Text
                  style={[
                    tw`text-center text-white`,
                    size === "base" && tw`text-base`,
                    size === "sm" && tw`text-xs`,
                  ]}
                >
                  {children}
                </Text>
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
