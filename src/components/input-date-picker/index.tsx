import React, { useState } from "react";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

import { cn } from "~/utils/style";

interface InputDatePickerProps {
  label?: string;
  icon?: LucideIcon;
  wrapperClassName?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const InputDatePicker = (props: InputDatePickerProps) => {
  const {
    label,
    icon: Icon,
    wrapperClassName,
    className,
    value,
    onChange,
    placeholder,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <View className={cn("gap-[2px]", wrapperClassName)}>
      {!!label && <Text className="px-1">{label}</Text>}

      <View className="relative">
        {!!Icon && (
          <View className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={22} color="#6b7280" strokeWidth={1} />
          </View>
        )}

        <View className="overflow-hidden rounded-2xl">
          <Pressable
            className={cn(
              "flex h-12 flex-row items-center rounded-2xl border border-gray-300 px-4",
              !!Icon && "pl-10",
              className,
            )}
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
