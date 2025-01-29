import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LucideAlertTriangle } from "lucide-react-native";
import { Modal, Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";

const PreRegistrationScreen = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    return () => setVisible(false);
  }, []);

  return (
    <Background
      style={tw`h-full items-center justify-center gap-8 p-4`}
      gradient={false}
    >
      <View style={tw`flex-1 items-center justify-center gap-8`}>
        <Logo />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={tw`h-full w-full items-center justify-center bg-black/50 p-4`}
        >
          <View style={tw`w-full gap-4 rounded-2xl bg-white p-4 shadow-sm`}>
            <View style={tw`flex flex-row items-center justify-center gap-2`}>
              <LucideAlertTriangle size={24} color="#000000" />

              <Text style={tw`text-lg`}>ATTENTION</Text>
            </View>

            <View style={tw`h-[1px] bg-gray-300`} />

            <View style={tw`gap-2`}>
              <Button
                onPress={() => {
                  navigation.navigate("User", { screen: "TermsOfService" });
                  setVisible(false);
                }}
              >
                Terms & Conditions
              </Button>

              <Button
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("User", { screen: "Registration" });
                }}
              >
                I Agree
              </Button>
            </View>

            <View style={tw`justify-center`}>
              <Text style={tw`text-center text-gray-500`}>
                By tapping "I Agree", you agree to the App's{" "}
                <Text
                  style={tw`underline`}
                  onPress={() => {
                    navigation.navigate("User", { screen: "TermsOfService" });
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

      <View style={tw`w-full gap-2`}>
        <View style={tw`flex-row gap-2`}>
          <Button wrapperStyle={tw`flex-1`} onPress={() => setVisible(true)}>
            Register
          </Button>

          <Button
            wrapperStyle={tw`flex-1`}
            onPress={() => navigation.navigate("User", { screen: "Login" })}
          >
            Login
          </Button>
        </View>

        <Text style={tw`text-center text-gray-500`}>
          By tapping "Register", you agree to the App's{" "}
          <Text
            style={tw`underline`}
            onPress={() =>
              navigation.navigate("User", { screen: "TermsOfService" })
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
