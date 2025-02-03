import React from "react";
import { Text } from "react-native";

import { ResponderLayout } from "~/components/layout/responder-layout";

const NotificationsScreen = () => {
  return (
    <ResponderLayout className="gap-4 p-4" title="Notifications">
      <Text>Notifications</Text>
    </ResponderLayout>
  );
};

export { NotificationsScreen };
