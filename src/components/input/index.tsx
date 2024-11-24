import React from "react";
import { LucideIcon } from "lucide-react-native";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { tw } from "~/lib/tailwind";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const Input = (props: InputProps) => {
  const { wrapperStyle, label, icon: Icon, style, ...rest } = props;

  return (
    <View style={[tw`gap-[2px]`, wrapperStyle]}>
      {!!label && <Text style={tw`px-1`}>{label}</Text>}

      <View style={tw`relative`}>
        {!!Icon && (
          <View
            style={[
              tw`absolute left-3 top-1/2`,
              {
                transform: [{ translateY: "-50%" }],
                zIndex: 1,
              },
            ]}
          >
            <Icon size={22} color="#6b7280" strokeWidth={1} />
          </View>
        )}

        <TextInput
          style={[
            tw`flex h-12 flex-row items-center rounded-lg border border-gray-300 bg-white px-4`,
            !!Icon && tw`pl-10`,
            style,
          ]}
          {...rest}
        />
      </View>
    </View>
  );
};

export { Input };
