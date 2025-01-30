import React, { ComponentProps } from "react";
import { LucideChevronDown } from "lucide-react-native";
import { remapProps } from "nativewind";
import Dropdown from "react-native-input-select";

const RemappedDropdown = remapProps(Dropdown, {
  labelClassName: "labelStyle",
  dropdownIconClassName: "dropdownIconStyle",
  dropdownClassName: "dropdownStyle",
});

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
    <RemappedDropdown
      placeholder="Select an option..."
      isMultiple={false}
      primaryColor={"green"}
      dropdownIcon={
        <LucideChevronDown size={22} color="#6b7280" strokeWidth={1} />
      }
      labelClassName="mb-0 px-2 text-sm text-black"
      dropdownIconClassName="-mt-1"
      dropdownClassName="flex h-12 flex-row items-center rounded-2xl border border-gray-300 px-4"
      selectedValue={value}
      onValueChange={(v) => typeof v === "string" && onChange(v)}
      {...rest}
    />
  );
};

export { Select };
