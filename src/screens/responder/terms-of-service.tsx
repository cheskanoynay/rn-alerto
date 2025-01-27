import React from "react";
import { Image, Text, View } from "react-native";

import { Background } from "~/components/background";
import { tw } from "~/lib/tailwind";

const TermsOfServiceScreen = () => {
  return (
    <Background style={tw`gap-8 p-4`}>
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          source={require("~/assets/images/logo.png")}
          style={tw`h-16 w-16`}
        />

        <Text style={tw`font-kaisei-decol-bold text-lg`}>ALERTO</Text>
      </View>

      <Text style={tw`text-center font-kaisei-decol-bold`}>
        TERMS OF SERVICE
      </Text>

      <View style={tw`flex-1 gap-4`}>
        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          By using the application, you agree that:
        </Text>

        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          You will only use the service for lawful purpose.
        </Text>

        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          You will not use the application to cause nuisance, annoyance,
          inconvenience or make prank.
        </Text>

        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          You acknowledge and agree that only one (1) account can be register on
          one device.
        </Text>

        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          You are aware that when sending alert service by using SMS or use the
          Service, standard telecommunication charges will apply.
        </Text>

        <Text style={tw`font-kaisei-decol-medium font-extralight`}>
          You are aware that by using the emergency button and power button
          features you are giving permission to the command center to track your
          location for the rescue purpose only.
        </Text>
      </View>
    </Background>
  );
};

export { TermsOfServiceScreen };
