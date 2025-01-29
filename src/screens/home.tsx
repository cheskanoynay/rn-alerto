import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";
import { useAppSelector } from "~/store";

const HomeScreen = () => {
  const { userData } = useAppSelector((state) => state.user);
  const navigation = useNavigation();

  return (
    <Background
      style={tw`items-center justify-between gap-8 p-4`}
      gradient={false}
    >
      <View style={tw`items-center justify-center gap-8 flex-1`}>
        <Logo />
      </View>

      <View style={tw`w-full flex-col items-center gap-4`}>
        {userData ? (
          <>
            <Text style={tw`text-2xl`}>
              Hello{" "}
              <Text style={tw`text-persian-red-600`}>{userData.name}</Text>!
            </Text>

            <Button>Logout</Button>
          </>
        ) : (
          <View style={tw`w-full gap-2`}>
            <Button
              wrapperStyle={tw`w-full`}
              onPress={() =>
                navigation.navigate("Responders", { screen: "Login" })
              }
            >
              I'm a Responder
            </Button>
            <Button
              wrapperStyle={tw`w-full`}
              onPress={() => navigation.navigate("User", { screen: "Home" })}
            >
              I'm a User
            </Button>
          </View>
        )}
      </View>
    </Background>
  );
};

export { HomeScreen };
