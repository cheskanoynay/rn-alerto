import React from "react";
import { Text } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";

const NotificationsScreen = () => {
  return (
    <UserLayout title="Notifications" className="gap-4 p-4">
      <Text>List of notifications...</Text>
    </UserLayout>
  );
};

export { NotificationsScreen };
