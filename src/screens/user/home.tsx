import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  LucideFlame,
  LucideShieldPlus,
  LucideSiren,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";

const UserHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <UserLayout style={tw``}>
      <View style={tw`flex-1 items-center justify-center p-4`}>
        <Logo />
      </View>

      <View style={tw`flex-row justify-around p-4`}>
        <View style={tw`items-center gap-2`}>
          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
              <LucideSiren size={32} style={tw`text-persian-red-600`} />
            </Pressable>
          </View>

          <Text style={tw`text-center text-xs`}>POLICE</Text>
        </View>

        <View style={tw`items-center gap-2`}>
          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
              <LucideShieldPlus size={32} style={tw`text-persian-red-600`} />
            </Pressable>
          </View>

          <Text style={tw`text-center text-xs`}>MEDICAL</Text>
        </View>

        <View style={tw`items-center gap-2`}>
          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
              <LucideFlame size={32} style={tw`text-persian-red-600`} />
            </Pressable>
          </View>

          <Text style={tw`text-center text-xs`}>FIRE</Text>
        </View>
      </View>
    </UserLayout>
  );
};

export { UserHomeScreen };
