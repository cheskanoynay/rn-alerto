import React, { ReactNode } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  LucideBell,
  LucideEllipsisVertical,
  LucideListCheck,
  LucideLogOut,
  LucideUser2,
} from "lucide-react-native";
import { remapProps } from "nativewind";
import { Image, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "~/store";
import { logout } from "~/store/auth-slice";
import { cn } from "~/utils/style";
import { Background } from "../background";

const RemappedMenuTrigger = remapProps(MenuTrigger, {
  className: "style",
});
const RemappedMenuOptions = remapProps(MenuOptions, {
  className: "customStyles",
  optionsContainerClassName: "optionsContainerStyle",
});
const RemappedMenuOption = remapProps(MenuOption, {
  className: "style",
});

interface ResponderLayoutProps {
  children?: ReactNode;
  className?: string;
}

const ResponderLayout = (props: ResponderLayoutProps) => {
  const { children, className } = props;

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
      <SafeAreaView className="h-full w-full">
        <Background gradient={false}>
          <View className="flex-row items-center justify-between p-4">
            <Image
              source={require("~/assets/images/logo.png")}
              className="h-12 w-12"
            />

            <Menu
              renderer={renderers.Popover}
              rendererProps={{ placement: "bottom" }}
            >
              <RemappedMenuTrigger className="items-center justify-center overflow-hidden rounded-full p-2">
                <LucideEllipsisVertical size={24} color="#000000" />
              </RemappedMenuTrigger>

              <RemappedMenuOptions optionsContainerClassName="py-2">
                <RemappedMenuOption
                  className="flex-row items-center gap-2 px-3"
                  onSelect={() =>
                    navigation.navigate("ResponderStack", { screen: "Profile" })
                  }
                >
                  <LucideUser2 size={16} color="#000000" />
                  <Text>Profile</Text>
                </RemappedMenuOption>

                <RemappedMenuOption
                  className="flex-row items-center gap-2 px-3"
                  onSelect={() =>
                    navigation.navigate("ResponderStack", {
                      screen: "Notifications",
                    })
                  }
                >
                  <LucideBell size={16} color="#000000" />
                  <Text>Notifications</Text>
                </RemappedMenuOption>

                <RemappedMenuOption
                  className="flex-row items-center gap-2 px-3"
                  onSelect={() =>
                    navigation.navigate("ResponderStack", {
                      screen: "TermsOfService",
                    })
                  }
                >
                  <LucideListCheck size={16} color="#000000" />
                  <Text>Terms of Service</Text>
                </RemappedMenuOption>

                <RemappedMenuOption
                  className="flex-row items-center gap-2 px-3"
                  onSelect={handleLogout}
                >
                  <LucideLogOut size={16} color="#000000" />
                  <Text>{loading ? "Logging out..." : "Logout"}</Text>
                </RemappedMenuOption>
              </RemappedMenuOptions>
            </Menu>
          </View>

          <View className={cn("flex-1", className)}>{children}</View>
        </Background>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export { ResponderLayout };
