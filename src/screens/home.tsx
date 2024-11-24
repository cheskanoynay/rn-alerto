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
    <Background style={tw`items-center justify-center gap-8 p-8`}>
      <Logo />

      <View style={tw`flex-col items-center gap-4`}>
        {userData ? (
          <>
            <Text style={tw`text-2xl`}>
              Hello{" "}
              <Text style={tw`text-persian-red-600`}>{userData.name}</Text>!
            </Text>

            <Button>Logout</Button>
          </>
        ) : (
          <>
            <Button
              onPress={() =>
                navigation.navigate("Responders", { screen: "Login" })
              }
            >
              I'm a Responder
            </Button>
            <Button
              onPress={() => navigation.navigate("User", { screen: "Home" })}
            >
              I'm a User
            </Button>
          </>
        )}
      </View>
    </Background>
  );
};

export { HomeScreen };
