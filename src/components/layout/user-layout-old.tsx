import React, { ReactNode } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  LucideBell,
  LucideEllipsisVertical,
  LucideHistory,
  LucideList,
  LucideListCheck,
  LucideLogOut,
  LucideUser2,
  LucideUsers2,
} from "lucide-react-native";
import { remapProps } from "nativewind";
import { Image, Text, View } from "react-native";
import {
  Menu,
  renderers,
  MenuOption as RNPMMenuOption,
  MenuOptions as RNPMMenuOptions,
  MenuTrigger as RNPMMenuTrigger,
} from "react-native-popup-menu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "~/store";
import { logout } from "~/store/auth-slice";
import { cn } from "~/utils/style";
import { Background } from "../background";

const MenuTrigger = remapProps(RNPMMenuTrigger, {
  className: "style",
});
const MenuOptions = remapProps(RNPMMenuOptions, {
  className: "customStyles",
  optionsContainerClassName: "optionsContainerStyle",
});
const MenuOption = remapProps(RNPMMenuOption, {
  className: "style",
});

interface UserLayoutProps {
  className?: string;
  children?: ReactNode;
  title?: string;
}

const UserLayout = (props: UserLayoutProps) => {
  const { className, children, title } = props;

  const navigation = useNavigation();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());

    StackActions.popToTop();
    navigation.navigate("Home");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className={`h-full w-full`}>
        <Background gradient={false}>
          <View className={`flex-row items-center justify-between p-4`}>
            <View className={`w-1/5`}>
              <Image
                source={require("~/assets/images/logo.png")}
                className={`h-12 w-12`}
              />
            </View>

            <View className={`flex-1`}>
              {!!title && (
                <Text className={`text-center text-lg text-white`}>
                  {title}
                </Text>
              )}
            </View>

            <View className={`w-1/5 flex-row justify-end`}>
              <Menu
                renderer={renderers.Popover}
                rendererProps={{ placement: "bottom" }}
              >
                <MenuTrigger className="items-center justify-center overflow-hidden rounded-full p-2">
                  <LucideEllipsisVertical size={24} color="#000000" />
                </MenuTrigger>

                <MenuOptions optionsContainerClassName="py-2">
                  <MenuOption
                    className="flex-row items-center gap-2 px-3"
                    onSelect={() =>
                      navigation.navigate("User", { screen: "Profile" })
                    }
                  >
                    <LucideUser2 size={16} color="#000000" />
                    <Text>Profile</Text>
                  </MenuOption>

                  <MenuOption
                    className="flex-row items-center gap-2 px-3"
                    onSelect={() =>
                      navigation.navigate("User", { screen: "Relatives" })
                    }
                  >
                    <LucideUsers2 size={16} color="#000000" />
                    <Text>My Relatives</Text>
                  </MenuOption>

                  <MenuOption
                    className="flex-row items-center gap-2 px-3"
                    onSelect={() =>
                      navigation.navigate("User", {
                        screen: "RecentActivities",
                      })
                    }
                  >
                    <LucideList size={16} color="#000000" />
                    <Text>Recent Activities</Text>
                  </MenuOption>

                  <MenuOption
                    className={`flex-row items-center gap-2 px-3`}
                    onSelect={() =>
                      navigation.navigate("User", { screen: "Notifications" })
                    }
                  >
                    <LucideBell size={16} color="#000000" />
                    <Text>Notifications</Text>
                  </MenuOption>

                  <MenuOption
                    className={`flex-row items-center gap-2 px-3`}
                    onSelect={() =>
                      navigation.navigate("User", { screen: "TermsOfService" })
                    }
                  >
                    <LucideListCheck size={16} color="#000000" />
                    <Text>Terms of Service</Text>
                  </MenuOption>

                  <MenuOption
                    className={`flex-row items-center gap-2 px-3`}
                    onSelect={() =>
                      navigation.navigate("User", { screen: "History" })
                    }
                  >
                    <LucideHistory size={16} color="#000000" />
                    <Text>History</Text>
                  </MenuOption>

                  <MenuOption
                    className={`flex-row items-center gap-2 px-3`}
                    onSelect={handleLogout}
                  >
                    <LucideLogOut size={16} color="#000000" />
                    <Text>{loading ? "Logging out..." : "Logout"}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>

          <View className={cn("flex-1", className)}>{children}</View>
        </Background>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export { UserLayout };
