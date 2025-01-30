import React from "react";
import { LucideIcon } from "lucide-react-native";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { cn } from "~/utils/style";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  wrapperClassName?: string;
}

const Input = (props: InputProps) => {
  const { wrapperClassName, className, label, icon: Icon, ...rest } = props;

  return (
    <View className={cn("gap-[2px]", wrapperClassName)}>
      {!!label && <Text className="px-1">{label}</Text>}

      <View className="relative">
        {!!Icon && (
          <View className="absolute left-4 top-1/2 z-[1] -translate-y-1/2">
            <Icon size={22} color="#6b7280" strokeWidth={1} />
          </View>
        )}

        <TextInput
          className={cn(
            "flex h-16 flex-row items-center rounded-2xl border border-gray-300 bg-white px-4",
            !!Icon && "pl-14",
            className,
          )}
          {...rest}
        />
      </View>
    </View>
  );
};

export { Input };
