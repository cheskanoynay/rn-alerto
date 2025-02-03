import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { LucideListCheck, LucidePhone } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Button } from "~/components/button";
import { ResponderLayout } from "~/components/layout/responder-layout";
import { useAppDispatch, useAppSelector } from "~/store";
import { logout } from "~/store/auth-slice";

const MenuScreen = () => {
  const { userData } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());

    StackActions.popToTop();
    navigation.navigate("Splash");
  };

  return (
    <ResponderLayout className="gap-4 p-4" title="Menu">
      <View className="flex-1 gap-2">
        <Pressable className="gap-2 rounded-2xl border border-gray-300 bg-white p-2 active:opacity-50">
          <LucidePhone />

          <Text>Hotline Numbers</Text>
        </Pressable>

        <Pressable
          className="gap-2 rounded-2xl border border-gray-300 bg-white p-2 active:opacity-50"
          onPress={() =>
            navigation.navigate("ResponderStack", { screen: "TermsOfService" })
          }
        >
          <LucideListCheck />

          <Text>Terms and Conditions</Text>
        </Pressable>
      </View>

      <Button loading={loading} onPress={handleLogout}>
        Logout
      </Button>
    </ResponderLayout>
  );
};

export { MenuScreen };
