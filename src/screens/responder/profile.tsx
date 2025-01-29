import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Alert, ScrollView, View } from "react-native";

import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { InputDatePicker } from "~/components/input-date-picker";
import { ResponderLayout } from "~/components/layout/responder-layout";
import { Select } from "~/components/select";
import { updateUser } from "~/lib/firebase/firestore";
import { tw } from "~/lib/tailwind";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const ProfileScreen = () => {
  const [name, setName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [gender, setGender] = useState<"male" | "female">("male");
  const [contact, setContact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { userData } = useAppSelector((state) => state.user);

  const canUpdate = !!(
    userData &&
    (userData.name !== name ||
      userData.birthdate !== format(birthdate, "yyyy-MM-dd") ||
      userData.gender !== gender ||
      userData.contact !== contact)
  );

  const handleUpdate = async () => {
    if (!userData) return Alert.alert("Failed", "Uset data not found.");

    setLoading(true);

    try {
      await updateUser(userData.id, {
        name,
        birthdate: format(birthdate, "yyyy-MM-dd"),
        gender,
        contact,
      });
    } catch (error) {
      const err = getError(error, "Failed updating user data.");

      Alert.alert("Failed", err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBirthdate(
        userData.birthdate
          ? parse(userData.birthdate, "yyyy-MM-dd", new Date())
          : new Date(),
      );
      setGender(userData.gender ?? "male");
      setContact(userData.contact);
    }
  }, [userData]);

  return (
    <ResponderLayout>
      <ScrollView contentContainerStyle={tw`gap-4 p-4`}>
        <View style={tw`items-center justify-center`}>
          <View style={tw`h-32 w-32 rounded-full bg-gray-300`} />
        </View>

        <Input label="Fullname" value={name} onChangeText={setName} />

        <InputDatePicker
          label="Birthdate"
          value={birthdate}
          onChange={setBirthdate}
        />

        <Select
          label="Gender"
          onChange={(v) => setGender(v as "male" | "female")}
          value={gender}
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />

        <Input label="Contact" value={contact} onChangeText={setContact} />

        <Input label="Barangay" />

        <Input label="Town" />

        <Button disabled={!canUpdate} onPress={handleUpdate} loading={loading}>
          Update
        </Button>
      </ScrollView>
    </ResponderLayout>
  );
};

export { ProfileScreen };
