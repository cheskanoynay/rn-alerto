import React, { useEffect, useState } from "react";
import { LucidePlus, LucideSearch } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDebounce } from "use-debounce";

import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { UserLayout } from "~/components/layout/user-layout";
import { createRelative, getUsersByRealtime } from "~/lib/firebase/firestore";
import { UserSchema } from "~/schema/user";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const AddRelativesScreen = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

  const [searchValue] = useDebounce(search, 1500);

  const { userData } = useAppSelector((state) => state.user);

  const handleAddRelative = async (relativeId: string) => {
    if (!(userData && isVisible)) return;
    setSaving(true);

    try {
      await createRelative({
        userId: userData.id,
        relativeId,
        relationship,
      });
    } catch (error) {
      const err = getError(error);

      Alert.alert("Failed", err.message);
    }

    setSaving(false);
    setIsVisible("");
    setRelationship("");
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setLoading(true);

      const unsubscribe = getUsersByRealtime({
        keyword: searchValue,
        role: "user",
      })((u) => {
        setLoading(false);
        setUsers(u);
      });

      return unsubscribe;
    }
  }, [searchValue]);

  return (
    <UserLayout title="My Relatives">
      <View className="p-4">
        <Input
          icon={LucideSearch}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView contentContainerClassName="gap-2 p-4">
          {users.map((user) => (
            <View
              key={`user-${user.id}`}
              className="flex-row items-center justify-between gap-2"
            >
              <View className="flex-row items-center gap-2">
                <View className="h-12 w-12 rounded-full bg-gray-300" />

                <Text>{user.name}</Text>
              </View>

              <TouchableOpacity
                className="h-12 w-12 items-center justify-center rounded-full bg-persian-red-600"
                onPress={() => setIsVisible(user.id)}
              >
                <LucidePlus size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <Modal isVisible={isVisible.length > 0}>
        <View className="gap-4 rounded-2xl bg-white p-4">
          <Text>What's your relationship with this relative?</Text>

          <Input
            placeholder="Relationship..."
            value={relationship}
            onChangeText={setRelationship}
          />

          <View className="flex-row gap-2">
            <Button
              wrapperClassName="flex-1"
              onPress={() => setIsVisible("")}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              wrapperClassName="flex-1"
              onPress={() => handleAddRelative(isVisible)}
              loading={saving}
            >
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </UserLayout>
  );
};

export { AddRelativesScreen };
