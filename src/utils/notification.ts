import { Platform } from "react-native";
import { requestNotifications, RESULTS } from "react-native-permissions";

export const isIos = () => Platform.OS === "ios";
export const isAndroid = () => Platform.OS === "android";
export const getPlatformVersion = () => Number(Platform.Version);

export const requestNotificationsPermission = (
  onGranted: () => void,
  onBlocked?: () => void,
) => {
  requestNotifications(["alert", "sound", "badge"]).then(({ status }) => {
    if (status === RESULTS.GRANTED) {
      onGranted();
    } else {
      onBlocked?.();
    }
  });
};
