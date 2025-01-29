import React, { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

import { Background } from "~/components/background";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";
import { useAppSelector } from "~/store";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { userData, loading, status } = useAppSelector((state) => state.user);

  const isLoaded = loading === false && status === "fetched";

  useEffect(() => {
    if (!isLoaded) return;

    const history = navigation.getState()?.history ?? [];

    if (history && history.length > 0) {
      navigation.dispatch(StackActions.popToTop());
    }

    switch (userData?.role) {
      case "responder": {
        console.log("Redirecting as a responder.");
        navigation.dispatch(StackActions.replace("Responders"));

        break;
      }

      case "user": {
        console.log("Redirecting as a user.");
        navigation.dispatch(StackActions.replace("User"));

        break;
      }

      default: {
        console.log("Redirecting to home.");
        navigation.dispatch(StackActions.replace("Home"));
        break;
      }
    }
  }, [isLoaded, navigation, userData]);

  return (
    <Background style={tw`items-center justify-center gap-4`} gradient={false}>
      <Logo />

      <Text>Loading...</Text>
    </Background>
  );
};

export { SplashScreen };
