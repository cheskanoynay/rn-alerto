import React from "react";
import { Text } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";

const NotificationsScreen = () => {
  return (
    <UserLayout title="Notifications">
      <Text className="text-gray-400">List of notifications...</Text>
    </UserLayout>
  );
};

export { NotificationsScreen };
