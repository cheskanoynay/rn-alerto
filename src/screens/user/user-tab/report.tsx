import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";
import { Logo } from "~/components/logo";

const ReportScreen = () => {
  const navigation = useNavigation();

  return (
    <UserLayout className="justify-center gap-8" title="Report">
      <View className="items-center justify-center">
        <Logo />
      </View>

      {/* <View className="gap-2 p-4">
        <Button className="flex-row items-center justify-start gap-2 px-2">
          <Image
            source={require("~/assets/images/pnp.png")}
            className="h-12 w-12 rounded-full bg-white"
          />

          <Text className="text-white">PNP - Calape</Text>
        </Button>

        <Button className="flex-row items-center justify-start gap-2 px-2">
          <Image
            source={require("~/assets/images/ndrrmc.png")}
            className="h-12 w-12 rounded-full bg-white"
          />

          <Text className="text-white">LDRRMO - Calape</Text>
        </Button>

        <Button className="flex-row items-center justify-start gap-2 px-2">
          <Image
            source={require("~/assets/images/bfp.png")}
            className="h-12 w-12 rounded-full bg-white"
          />

          <Text className="text-white">BFP - Calape</Text>
        </Button>
      </View> */}

      <View className="flex-row justify-around p-4">
        <View className="items-center gap-1">
          <View className="overflow-hidden rounded-full shadow">
            <Pressable
              className="h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white"
              android_ripple={{
                color: "#000000",
                borderless: true,
              }}
              onPress={() =>
                navigation.navigate("User", {
                  screen: "Report",
                  params: { type: "police" },
                })
              }
            >
              <Image
                source={require("~/assets/images/pnp.png")}
                className="h-20 w-20"
              />
            </Pressable>
          </View>

          <Text className="text-center">PNP</Text>
        </View>

        <View className="items-center gap-1">
          <View className="overflow-hidden rounded-full shadow">
            <Pressable
              className="h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white"
              android_ripple={{
                color: "#000000",
                borderless: true,
              }}
              onPress={() =>
                navigation.navigate("User", {
                  screen: "Report",
                  params: { type: "medical" },
                })
              }
            >
              <Image
                source={require("~/assets/images/ndrrmc.png")}
                className="h-20 w-20"
              />
            </Pressable>
          </View>

          <Text className="text-center">LDRRMO</Text>
        </View>

        <View className="items-center gap-1">
          <View className="overflow-hidden rounded-full shadow">
            <Pressable
              className="h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white"
              android_ripple={{
                color: "#000000",
                borderless: true,
              }}
              onPress={() =>
                navigation.navigate("User", {
                  screen: "Report",
                  params: { type: "fire" },
                })
              }
            >
              <Image
                source={require("~/assets/images/bfp.png")}
                className="h-20 w-20"
              />
            </Pressable>
          </View>

          <Text className="text-center">BFP</Text>
        </View>
      </View>
    </UserLayout>
  );
};

export { ReportScreen };
