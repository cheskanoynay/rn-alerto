import React, { ComponentProps } from "react";
import { LucideChevronDown } from "lucide-react-native";
import Dropdown from "react-native-input-select";

import { tw } from "~/lib/tailwind";

interface SelectProps
  extends Omit<
    ComponentProps<typeof Dropdown>,
    "selectedValue" | "onValueChange"
  > {
  value: string;
  onChange: (value: string) => void;
}

const Select = (props: SelectProps) => {
  const { onChange, value, ...rest } = props;

  return (
    <Dropdown
      placeholder="Select an option..."
      isMultiple={false}
      primaryColor={"green"}
      dropdownIcon={
        <LucideChevronDown size={22} color="#6b7280" strokeWidth={1} />
      }
      labelStyle={tw`text-sm text-black px-2 mb-0`}
      dropdownIconStyle={tw`-mt-1`}
      dropdownStyle={tw`flex h-12 flex-row items-center rounded-lg border border-gray-300 px-4`}
      selectedValue={value}
      onValueChange={(v) => typeof v === "string" && onChange(v)}
      {...rest}
    />
  );
};

export { Select };
