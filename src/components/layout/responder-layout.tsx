import React, { ReactNode } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  LucideBell,
  LucideEllipsisVertical,
  LucideListCheck,
  LucideLogOut,
  LucideUser2,
} from "lucide-react-native";
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { tw } from "~/lib/tailwind";
import { useAppDispatch, useAppSelector } from "~/store";
import { logout } from "~/store/auth-slice";
import { Background } from "../background";

interface ResponderLayoutProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ResponderLayout = (props: ResponderLayoutProps) => {
  const { children, style = false } = props;

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
      <SafeAreaView style={tw`h-full w-full`}>
        <Background>
          <View style={tw`flex-row items-center justify-between p-4`}>
            <Image
              source={require("~/assets/images/logo.png")}
              style={tw`h-12 w-12`}
            />

            <Menu
              renderer={renderers.Popover}
              rendererProps={{ placement: "bottom" }}
            >
              <MenuTrigger
                style={tw`items-center justify-center overflow-hidden rounded-full p-2`}
              >
                <LucideEllipsisVertical size={24} color="#000000" />
              </MenuTrigger>

              <MenuOptions optionsContainerStyle={tw`py-2`}>
                <MenuOption
                  style={tw`flex-row items-center gap-2 px-3`}
                  onSelect={() =>
                    navigation.navigate("Responders", { screen: "Profile" })
                  }
                >
                  <LucideUser2 size={16} color="#000000" />
                  <Text>Profile</Text>
                </MenuOption>

                <MenuOption
                  style={tw`flex-row items-center gap-2 px-3`}
                  onSelect={() =>
                    navigation.navigate("Responders", {
                      screen: "Notifications",
                    })
                  }
                >
                  <LucideBell size={16} color="#000000" />
                  <Text>Notifications</Text>
                </MenuOption>

                <MenuOption
                  style={tw`flex-row items-center gap-2 px-3`}
                  onSelect={() =>
                    navigation.navigate("Responders", {
                      screen: "TermsOfService",
                    })
                  }
                >
                  <LucideListCheck size={16} color="#000000" />
                  <Text>Terms of Service</Text>
                </MenuOption>

                <MenuOption
                  style={tw`flex-row items-center gap-2 px-3`}
                  onSelect={handleLogout}
                >
                  <LucideLogOut size={16} color="#000000" />
                  <Text>{loading ? "Logging out..." : "Logout"}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>

          <View style={[tw`flex-1`, style]}>{children}</View>
        </Background>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export { ResponderLayout };
