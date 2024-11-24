import React, { ReactNode, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

import { getUserRealtime, updateUser } from "~/lib/firebase/firestore";
import { useAppDispatch, useAppSelector } from "~/store";
import { setUser } from "~/store/auth-slice";
import { setUserData } from "~/store/user-slice";

interface WrapperProps {
  children?: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  const { children } = props;

  const {
    user,
    loading: authLoading,
    status: authStatus,
  } = useAppSelector((state) => state.auth);
  const {
    userData,
    loading: userLoading,
    status: userStatus,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const authLoaded = authLoading === false && authStatus === "fetched";
  const userLoaded = userLoading === false && userStatus === "fetched";

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => dispatch(setUser(u)));

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (!authLoaded) return;

    if (user) {
      const unsubscribe = getUserRealtime(user.uid)((udata) => {
        console.log("called");
        dispatch(setUserData(udata));
      });

      return unsubscribe;
    }

    dispatch(setUserData(null));
  }, [dispatch, authLoaded, user]);

  useEffect(() => {
    console.log("MESSAGING");
    const unsubscribe = messaging().onMessage(async (m) => {
      const { notification } = m;
      const title = notification?.title ?? "New Notification";
      const body =
        notification?.body ?? "You received an unknown notification.";

      Alert.alert(title, body);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(async (m) => {
      const { notification } = m;
      console.log(notification);

      return null;
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userLoaded) return;

    if (userData) {
      messaging()
        .getToken({
          vapidKey:
            "BKGolJ7AMBQSLPbkdhynnQZjQC2_F3KjIt35mn4i914UB2QnJhSNhOwq0BWv8qwiUbazKMPhdK04l835ysBe2Es",
        })
        .then(async (r) => {
          const exist = userData.tokens.includes(r);

          if (!exist)
            await updateUser(userData.id, { tokens: [...userData.tokens, r] });
        });
    }
  }, [userData, userLoaded]);

  return <>{children}</>;
};

export { Wrapper };
