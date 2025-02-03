import { cssInterop } from "nativewind";
import Dropdown from "react-native-input-select";

cssInterop(Dropdown, {
  labelClassName: "labelStyle",
  dropdownIconClassName: "dropdownIconStyle",
  dropdownClassName: "dropdownStyle",
});

export { Dropdown };
