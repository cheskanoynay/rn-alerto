import React, { useState } from "react";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react-native";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import DatePicker from "react-native-date-picker";

import { tw } from "~/lib/tailwind";

interface InputDatePickerProps {
  label?: string;
  icon?: LucideIcon;
  wrapperStyle?: StyleProp<ViewStyle>;
  value?: Date;
  onChange?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}

const InputDatePicker = (props: InputDatePickerProps) => {
  const {
    label,
    icon: Icon,
    wrapperStyle,
    style,
    value,
    onChange,
    placeholder,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

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
              },
            ]}
          >
            <Icon size={22} color="#6b7280" strokeWidth={1} />
          </View>
        )}

        <View style={tw`overflow-hidden rounded-lg`}>
          <Pressable
            style={[
              tw`flex h-12 flex-row items-center rounded-lg border border-gray-300 px-4`,
              !!Icon && tw`pl-10`,
              style,
            ]}
            android_ripple={{
              color: "#ffffff",
              borderless: true,
            }}
            onPress={() => setOpen(true)}
          >
            {value ? (
              <Text>{format(value, "MMM dd, yyyy")}</Text>
            ) : (
              <Text>{placeholder ?? "Select date"}</Text>
            )}
          </Pressable>
        </View>
      </View>

      <DatePicker
        modal
        open={open}
        date={value ?? new Date()}
        mode="date"
        onConfirm={(date) => {
          onChange?.(date);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export { InputDatePicker };
