import React from "react";
import { LucideAlertCircle } from "lucide-react-native";
import { Text, View } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";

const HomeScreen = () => {
  console.log("HHSHAJSHD");
  return (
    <UserLayout title="Home" className="gap-4 p-4">
      <View className="h-32 justify-between rounded-2xl border border-persian-red-600 bg-persian-red-600 p-4">
        <LucideAlertCircle color="#ffffff" size={40} />
        <Text className="text-white">Example Component For Future Use</Text>
      </View>

      <View>
        <Text className="text-xl">Nearby Alerts:</Text>
        <Text className="text-gray-400">List of nearby alerts...</Text>
      </View>
    </UserLayout>
  );
};

export { HomeScreen };
