import React, { ReactNode } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";

import { store } from "~/store";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <MenuProvider>{children}</MenuProvider>
    </Provider>
  );
};

export { Providers };
