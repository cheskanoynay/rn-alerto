import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

import { cn } from "~/utils/style";
import { Spinner } from "./spinner";

interface ButtonProps extends PressableProps {
  wrapperClassName?: string;
  className?: string;
  loading?: boolean;
  size?: "base" | "sm";
  color?: "default" | "green" | "gray";
}

const Button = (props: ButtonProps) => {
  const {
    loading,
    children,
    disabled,
    wrapperClassName,
    className,
    size = "base",
    color = "default",
    ...rest
  } = props;

  return (
    <View
      className={cn(
        "overflow-hidden rounded-2xl",
        wrapperClassName,
        size === "base" && "h-16",
        size === "sm" && "h-14",
      )}
    >
      <Pressable
        {...rest}
        className={cn(
          size === "base" &&
            "h-16 flex-1 flex-row items-center justify-center gap-1 rounded-2xl px-6 py-2",
          size === "sm" &&
            "h-14 flex-1 flex-row items-center justify-center gap-1 rounded-2xl px-4 py-1 text-xs",
          color === "default" &&
            "bg-persian-red-600 active:bg-persian-red-600/90",
          color === "green" && "bg-green-600 active:bg-green-600/90",
          color === "gray" && "bg-gray-600 active:bg-gray-600/90",
          (disabled || loading) && "opacity-50",
          className,
        )}
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
                <Spinner size={20} className="text-white" color="#ffffff" />
              )}

              {typeof children === "string" ? (
                <Text
                  className={cn(
                    "text-center text-white",
                    size === "base" && "text-base",
                    size === "sm" && "text-xs",
                  )}
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
