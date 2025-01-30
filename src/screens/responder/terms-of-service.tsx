import React from "react";
import { Image, Text, View } from "react-native";

import { Background } from "~/components/background";

const TermsOfServiceScreen = () => {
  return (
    <Background className="h-full gap-4 p-4" gradient={false}>
      <View className="flex-row items-center gap-2">
        <Image
          source={require("~/assets/images/logo.png")}
          className="h-16 w-16"
        />

        <Text className="font-kaisei-decol-bold text-lg text-persian-red-600">
          ALERTO
        </Text>
      </View>

      <View className="w-full flex-1 gap-8">
        <Text className="text-center text-2xl">TERMS OF SERVICE</Text>

        <View className="gap-4">
          <Text className="">By using the application, you agree that:</Text>

          <Text className="">
            You will only use the service for lawful purpose.
          </Text>

          <Text className="">
            You will not use the application to cause nuisance, annoyance,
            inconvenience or make prank.
          </Text>

          <Text className="">
            You acknowledge and agree that only one (1) account can be register
            on one device.
          </Text>

          <Text className="">
            You are aware that when sending alert service by using SMS or use
            the Service, standard telecommunication charges will apply.
          </Text>

          <Text className="">
            You are aware that by using the emergency button and power button
            features you are giving permission to the command center to track
            your location for the rescue purpose only.
          </Text>
        </View>
      </View>
    </Background>
  );
};

export { TermsOfServiceScreen };
