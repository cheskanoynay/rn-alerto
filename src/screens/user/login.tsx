import React, { useRef, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { LucideLock, LucideMail } from "lucide-react-native";
import { Alert, ScrollView, View } from "react-native";
import Recaptcha, { RecaptchaRef } from "react-native-recaptcha-that-works";

import { Background } from "~/components/background";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Logo } from "~/components/logo";
import { useAppDispatch, useAppSelector } from "~/store";
import { login } from "~/store/auth-slice";
import { getError } from "~/utils/error";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const recaptcha = useRef<RecaptchaRef>(null);

  const navigation = useNavigation();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleRecaptchaVerify = async () => {
    try {
      await dispatch(login({ email, password, role: "user" })).unwrap();

      StackActions.popToTop();
      navigation.navigate("UserStack", {
        screen: "UserTab",
        params: { screen: "Home" },
      });
    } catch (error) {
      const err = getError(error, "Login failed.");

      Alert.alert("Failed", err.message);
    }
  };

  const handleRecaptchaExpire = () => {
    Alert.alert("Failed", "Recaptcha verification failed.");
  };

  const handleLogin = async () => {
    recaptcha.current?.open();
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
          <View className="gap-2">
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
          </View>

          <Button loading={loading} onPress={handleLogin}>
            Login as User
          </Button>
        </View>

        <Recaptcha
          ref={recaptcha}
          siteKey="6LeLJbkqAAAAACsIaDpWFv_lLn2Nes0c8mXEkD91"
          baseUrl="https://next-alerto.vercel.app/login"
          onVerify={handleRecaptchaVerify}
          onExpire={handleRecaptchaExpire}
          size="invisible"
        />
      </Background>
    </ScrollView>
  );
};

export { LoginScreen };
