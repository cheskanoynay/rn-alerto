import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { cn } from "~/utils/style";
import { Background } from "../background";

interface UserLayoutProps {
  className?: string;
  children?: ReactNode;
  title?: string;
  hideProfile?: boolean;
  leftComponent?: ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
  const {
    className,
    children,
    title,
    hideProfile = false,
    leftComponent,
  } = props;

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full w-full">
        <Background gradient={false}>
          <View className="h-16 flex-row items-center justify-between border-b border-b-gray-300 px-4">
            <View className="w-1/5">{leftComponent}</View>

            <View className="flex-1">
              {!!title && (
                <Text className="text-center text-lg text-black">{title}</Text>
              )}
            </View>

            <View className="w-1/5 flex-row justify-end">
              {hideProfile === false && (
                <Pressable
                  className="active:opacity-50"
                  onPress={() =>
                    navigation.navigate("UserStack", { screen: "Profile" })
                  }
                >
                  <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                    <Text>P</Text>
                  </View>
                </Pressable>
              )}
            </View>
          </View>

          <View className={cn("flex-1", className)}>{children}</View>
        </Background>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export { UserLayout };
