import React, { useEffect } from "react";
import { PortalHost } from "@rn-primitives/portal";
import { request } from "react-native-permissions";

import { Wrapper } from "~/components/wrapper";
import {
  getPlatformVersion,
  isAndroid,
  isIos,
  requestNotificationsPermission,
} from "~/utils/notification";
import { Providers } from "./src/components/providers";
import { Navigations } from "./src/navigations";

import "./global.css";

const App = () => {
  useEffect(() => {
    if (isIos() || (isAndroid() && getPlatformVersion() >= 33)) {
      requestNotificationsPermission(
        () => {
          //notification granted tasks
          console.log("hello");
        },
        () => {
          //notification denied tasks
          console.log("bye");
        },
      );
    }
  }, []);

  useEffect(() => {
    request("android.permission.ACCESS_FINE_LOCATION").then((r) =>
      console.log(r),
    );
  }, []);

  return (
    <Providers>
      <Wrapper>
        <Navigations />

        <PortalHost />
      </Wrapper>
    </Providers>
  );
};

export default App;
