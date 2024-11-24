import React, { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { LucideLock, LucideMail } from "lucide-react-native";
import { Alert, View } from "react-native";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Logo } from "~/components/logo";
import { tw } from "~/lib/tailwind";
import { useAppDispatch, useAppSelector } from "~/store";
import { login } from "~/store/auth-slice";
import { getError } from "~/utils/error";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password, role: "user" })).unwrap();

      StackActions.popToTop();
      navigation.navigate("User", { screen: "Home" });
    } catch (error) {
      const err = getError(error, "Login failed.");

      Alert.alert("Failed", err.message);
    }
  };

  return (
    <Background style={tw`items-center justify-center gap-8 p-8`}>
      <Logo />

      <View style={tw`w-full gap-4`}>
        <Input
          label="Email"
          wrapperStyle={tw`w-full`}
          icon={LucideMail}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Input
          label="Password"
          wrapperStyle={tw`w-full`}
          icon={LucideLock}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>

      <Button loading={loading} onPress={handleLogin}>
        Login
      </Button>
    </Background>
  );
};

export { LoginScreen };
