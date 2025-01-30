import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Logo } from "~/components/logo";
import { useAppSelector } from "~/store";

const HomeScreen = () => {
  const { userData } = useAppSelector((state) => state.user);
  const navigation = useNavigation();

  console.log("ASDOASJDLKASJDLj");

  return (
    <Background className="justify-center gap-8 p-4" gradient={false}>
      <View className="items-center justify-center">
        <Logo />
      </View>

      <View className="w-full flex-col items-center gap-4">
        {userData ? (
          <>
            <Text className="text-2xl">
              Hello{" "}
              <Text className="text-persian-red-600">{userData.name}</Text>!
            </Text>

            <Button>Logout</Button>
          </>
        ) : (
          <View className="w-full gap-2">
            <Button
              wrapperClassName="w-full"
              onPress={() =>
                navigation.navigate("ResponderStack", { screen: "Login" })
              }
            >
              I'm a Responder
            </Button>

            <Button
              wrapperClassName="w-full"
              onPress={() =>
                navigation.navigate("UserStack", { screen: "PreRegistration" })
              }
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
