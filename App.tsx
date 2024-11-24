import React, { useEffect } from "react";
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
      </Wrapper>
    </Providers>
  );
};

export default App;
