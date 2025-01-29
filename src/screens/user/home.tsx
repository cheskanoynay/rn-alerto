import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

import { Button } from "~/components/button";
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

      {/* <View style={tw`gap-2 p-4`}>
        <Button style={tw`flex-row items-center justify-start gap-2 px-2`}>
          <Image
            source={require("~/assets/images/pnp.png")}
            style={tw`h-12 w-12 bg-white rounded-full`}
          />

          <Text style={tw`text-white`}>PNP - Calape</Text>
        </Button>

        <Button style={tw`flex-row items-center justify-start gap-2 px-2`}>
          <Image
            source={require("~/assets/images/ndrrmc.png")}
            style={tw`h-12 w-12 bg-white rounded-full`}
          />

          <Text style={tw`text-white`}>LDRRMO - Calape</Text>
        </Button>

        <Button style={tw`flex-row items-center justify-start gap-2 px-2`}>
          <Image
            source={require("~/assets/images/bfp.png")}
            style={tw`h-12 w-12 bg-white rounded-full`}
          />

          <Text style={tw`text-white`}>BFP - Calape</Text>
        </Button>
      </View> */}

      <View style={tw`flex-row justify-around p-4`}>
        <View style={tw`items-center gap-1`}>
          <View
            style={[
              tw`overflow-hidden rounded-full`,
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
          >
            <Pressable
              style={tw`h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
                style={tw`h-20 w-20`}
              />
            </Pressable>
          </View>

          <Text style={tw`text-center`}>PNP</Text>
        </View>

        <View style={tw`items-center gap-1`}>
          <View
            style={[
              tw`overflow-hidden rounded-full`,
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
          >
            <Pressable
              style={tw`h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
                style={tw`h-20 w-20`}
              />
            </Pressable>
          </View>

          <Text style={tw`text-center`}>LDRRMO</Text>
        </View>

        <View style={tw`items-center gap-1`}>
          <View
            style={[
              tw`overflow-hidden rounded-full`,
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
          >
            <Pressable
              style={tw`h-22 w-22 items-center justify-center overflow-hidden rounded-full border bg-white`}
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
                style={tw`h-20 w-20`}
              />
            </Pressable>
          </View>

          <Text style={tw`text-center`}>BFP</Text>
        </View>
      </View>
    </UserLayout>
  );
};

export { UserHomeScreen };
