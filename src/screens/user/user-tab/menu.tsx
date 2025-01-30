import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Button } from "~/components/button";
import { UserLayout } from "~/components/layout/user-layout";
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
    <UserLayout className="gap-4 p-4" title="Menu">
      <Pressable className="h-20 flex-row items-center justify-between gap-4 rounded-2xl border border-gray-300 p-2 active:opacity-50">
        <View className="flex-row items-center gap-4">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-gray-300">
            <Text>ST</Text>
          </View>

          <View>
            <Text>{userData?.name}</Text>
            <Text className="text-sm text-gray-500">View Profile</Text>
          </View>
        </View>

        <ChevronRight />
      </Pressable>

      <View className="flex-1 justify-end">
        <Button loading={loading} onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </UserLayout>
  );
};

export { MenuScreen };
