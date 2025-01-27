import React from "react";
import { Image, Text, View } from "react-native";

import { Background } from "~/components/background";
import { tw } from "~/lib/tailwind";

const TermsOfServiceScreen = () => {
  return (
    <Background style={tw`h-full gap-4 p-4`} gradient={false}>
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          source={require("~/assets/images/logo.png")}
          style={tw`h-16 w-16`}
        />

        <Text style={tw`font-kaisei-decol-bold text-lg text-persian-red-600`}>
          ALERTO
        </Text>
      </View>

      <View style={tw`w-full flex-1 gap-8`}>
        <Text style={tw`text-center text-2xl`}>TERMS OF SERVICE</Text>

        <View style={tw`gap-4`}>
          <Text style={tw``}>By using the application, you agree that:</Text>

          <Text style={tw``}>
            You will only use the service for lawful purpose.
          </Text>

          <Text style={tw``}>
            You will not use the application to cause nuisance, annoyance,
            inconvenience or make prank.
          </Text>

          <Text style={tw``}>
            You acknowledge and agree that only one (1) account can be register
            on one device.
          </Text>

          <Text style={tw``}>
            You are aware that when sending alert service by using SMS or use
            the Service, standard telecommunication charges will apply.
          </Text>

          <Text style={tw``}>
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
