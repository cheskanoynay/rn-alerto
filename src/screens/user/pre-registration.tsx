import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LucideAlertTriangle } from "lucide-react-native";
import { Modal, Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Logo } from "~/components/logo";

const PreRegistrationScreen = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    return () => setVisible(false);
  }, []);

  return (
    <Background
      className="h-full items-center justify-center gap-8 p-4"
      gradient={false}
    >
      <View className="flex-1 items-center justify-center gap-8">
        <Logo />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View className="h-full w-full items-center justify-center bg-black/50 p-4">
          <View className="w-full gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex flex-row items-center justify-center gap-2">
              <LucideAlertTriangle size={24} color="#000000" />

              <Text className="text-lg">ATTENTION</Text>
            </View>

            <View className="h-[1px] bg-gray-300" />

            <View className="gap-2">
              <Button
                onPress={() => {
                  navigation.navigate("UserStack", {
                    screen: "TermsOfService",
                  });
                  setVisible(false);
                }}
              >
                Terms & Conditions
              </Button>

              <Button
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("UserStack", { screen: "Registration" });
                }}
              >
                I Agree
              </Button>
            </View>

            <View className="justify-center">
              <Text className="text-center text-gray-500 text-lg">
                By tapping "I Agree", you agree to the App's{" "}
                <Text
                  className="underline"
                  onPress={() => {
                    navigation.navigate("UserStack", {
                      screen: "TermsOfService",
                    });
                    setVisible(false);
                  }}
                >
                  Terms and Conditions
                </Text>
                .
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <View className="w-full gap-2">
        <View className="flex-row gap-2">
          <Button wrapperClassName="flex-1" onPress={() => setVisible(true)}>
            Register
          </Button>

          <Button
            wrapperClassName="flex-1"
            onPress={() =>
              navigation.navigate("UserStack", { screen: "Login" })
            }
          >
            Login
          </Button>
        </View>

        <Text className="text-center text-gray-500 text-lg">
          By tapping "Register", you agree to the App's{" "}
          <Text
            className="underline"
            onPress={() =>
              navigation.navigate("UserStack", { screen: "TermsOfService" })
            }
          >
            Terms and Conditions
          </Text>
          .
        </Text>
      </View>
    </Background>
  );
};

export { PreRegistrationScreen };
