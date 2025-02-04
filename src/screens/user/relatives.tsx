import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { Button } from "~/components/button";
import { UserLayout } from "~/components/layout/user-layout";
import {
  getRelativesByUserIdRealtime,
  getUsersBy
} from "~/lib/firebase/firestore";
import { tw } from "~/lib/tailwind";
import { RelativeSchema } from "~/schema/relative";
import { UserSchema } from "~/schema/user";
import { useAppSelector } from "~/store";

const RelativesScreen = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [relatives, setRelatives] = useState<RelativeSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userData } = useAppSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    if (userData) {
      setLoading(true);

      const unsubscribe = getRelativesByUserIdRealtime(userData.id)(async (
        rs,
      ) => {
        const userIds = rs
          .reduce((p, c) => [...p, c.userId, c.relativeId], [] as string[])
          .filter((id) => id !== userData.id);

        const usersArr = await getUsersBy({ ids: userIds });

        setUsers(usersArr);
        setRelatives(rs);
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [userData]);

  return (
    <UserLayout title="My Relatives">
      {loading ? (
        <View style={tw`flex-1 items-center justify-center p-4`}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={tw`gap-2 p-4`}>
          {relatives.map((r) => {
            const relativeId =
              r.userId === userData?.id ? r.relativeId : r.userId;
            const data = users.find((u) => u.id === relativeId);

            return (
              <View
                key={`user-${r.id}`}
                style={tw`flex-row items-center justify-between gap-2`}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`h-12 w-12 rounded-full bg-gray-300`} />

                  <Text>{data?.name}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      <View style={tw`p-4`}>
        <Button
          onPress={() =>
            navigation.navigate("User", { screen: "AddRelatives" })
          }
        >
          Add Relative
        </Button>
      </View>
    </UserLayout>
  );
};

export { RelativesScreen };

