import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LucideLock, LucideMail, LucideUser2 } from "lucide-react-native";
import { Alert, ScrollView, Text, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Logo } from "~/components/logo";
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
    <ScrollView contentContainerClassName="flex-grow">
      <Background
        className="items-center justify-center gap-8 p-4"
        gradient={false}
      >
        <View className="flex-1 items-center justify-center gap-8">
          <Logo />
        </View>

        <View className="w-full gap-4">
          <View className="w-full gap-2">
            <Input
              label="Fullname"
              wrapperClassName="w-full"
              icon={LucideUser2}
              onChangeText={setName}
              value={name}
              placeholder="Enter fullname"
            />

            <Input
              label="Email"
              wrapperClassName="w-full"
              icon={LucideMail}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              placeholder="Enter email address"
            />

            <Input
              label="Password"
              wrapperClassName="w-full"
              icon={LucideLock}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Enter password"
            />

            <Text className="text-center text-lg text-gray-500">
              By tapping "Register", you agree to the App's{" "}
              <Text className="`underline`">Terms and Conditions</Text>.
            </Text>
          </View>

          <Button loading={loading} onPress={handleRegister}>
            Register
          </Button>
        </View>
      </Background>
    </ScrollView>
  );
};

export { RegistrationScreen };
