import React, { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { LucideLock, LucideMail, LucideUser2 } from "lucide-react-native";
import { Alert, Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";
import { useAppDispatch, useAppSelector } from "~/store";
import { register } from "~/store/auth-slice";
import { getError } from "~/utils/error";

const RegistrationScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    try {
      await dispatch(register({ email, password, name })).unwrap();

      Alert.alert("Success", "Please wait for admin to confirm you account.");

      // StackActions.popToTop();
      // navigation.navigate("User", { screen: "Home" });
    } catch (error) {
      const err = getError(error, "Registration failed.");

      Alert.alert("Failed", err.message);
    }
  };

  return (
    <Background
      style={tw`items-center justify-center gap-8 p-4`}
      gradient={false}
    >
      <View style={tw`flex-1 items-center justify-center gap-8`}>
        <Logo />
      </View>

      <View style={tw`w-full gap-4`}>
        <View style={tw`w-full gap-2`}>
          <Input
            label="Fullname"
            wrapperStyle={tw`w-full`}
            icon={LucideUser2}
            onChangeText={setName}
            value={name}
            placeholder="Enter fullname"
          />

          <Input
            label="Email"
            wrapperStyle={tw`w-full`}
            icon={LucideMail}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            placeholder="Enter email address"
          />

          <Input
            label="Password"
            wrapperStyle={tw`w-full`}
            icon={LucideLock}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Enter password"
          />

          <Text style={tw`text-center text-xs text-gray-500`}>
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

        <Button loading={loading} onPress={handleRegister}>
          Register
        </Button>
      </View>
    </Background>
  );
};

export { RegistrationScreen };
