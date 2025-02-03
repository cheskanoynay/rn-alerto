import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import haversine from "haversine-distance";
import { Alert, ScrollView, Text, View } from "react-native";

// import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { InputDatePicker } from "~/components/input-date-picker";
import { UserLayout } from "~/components/layout/user-layout";
import { Select } from "~/components/select";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
import { calape } from "~/const/calape";
import { updateUser } from "~/lib/firebase/firestore";
import { getGeolocation } from "~/lib/geolocation";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const ProfileScreen = () => {
  const [name, setName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [gender, setGender] = useState<"male" | "female">("male");
  const [contact, setContact] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { userData } = useAppSelector((state) => state.user);

  const canUpdate = !!(
    userData &&
    (userData.name !== name ||
      userData.birthdate !== format(birthdate, "yyyy-MM-dd") ||
      userData.gender !== gender ||
      userData.contact !== contact)
  );

  // const insets = useSafeAreaInsets();
  // const contentInsets = {
  //   top: insets.top,
  //   bottom: insets.bottom,
  //   left: 16,
  //   right: 16,
  // };

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

  // useEffect(() => {
  //   const barangayData = calape.barangays.find((b) => b.id === barangay);

  //   if (!barangayData) return;

  //   getGeolocation().then((g) => {
  //     console.log("current location", g);
  //     const awesome = calape.barangays.map((b) =>
  //       haversine(
  //         {
  //           latitude: g.latitude,
  //           longitude: b.longitude,
  //         },
  //         { latitude: b.latitude, longitude: b.longitude },
  //       ),
  //     );

  //     console.log("HOLE", awesome);
  //   });
  // }, [barangay]);

  return (
    <UserLayout title="Profile" hideProfile>
      <ScrollView contentContainerClassName="gap-4 p-4">
        <View className="items-center justify-center">
          <View className="h-32 w-32 rounded-full bg-gray-300" />
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

        {/* <View>
          <Text className="px-1">Gender</Text>

          <Select>
            <SelectTrigger className="native:h-16 w-full rounded-2xl border-gray-300 px-4">
              <SelectValue
                className="text-foreground native:text-base"
                placeholder="Select gender"
              />
            </SelectTrigger>

            <SelectContent insets={contentInsets} className="w-full">
              <SelectGroup>
                <SelectItem label="Male" value="male">
                  Male
                </SelectItem>

                <SelectItem label="Female" value="female">
                  Female
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View> */}

        <Input label="Contact" value={contact} onChangeText={setContact} />

        <Select
          label="Barangay"
          onChange={(v) => setBarangay(v)}
          value={barangay}
          options={calape.barangays.map((b) => ({
            label: b.name,
            value: b.id,
          }))}
        />

        {/* <View>
          <Text className="px-1">Barangay</Text>

          <Select>
            <SelectTrigger className="native:h-16 w-full rounded-2xl border-gray-300 px-4">
              <SelectValue
                className="text-foreground native:text-base"
                placeholder="Select barangay"
              />
            </SelectTrigger>

            <SelectContent insets={contentInsets} className="w-full">
              <SelectGroup>
                {calape.barangays.map((b) => (
                  <SelectItem key={b.id} label={b.name} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View> */}

        {/* <Input label="Town" /> */}

        <Button disabled={!canUpdate} onPress={handleUpdate} loading={loading}>
          Update
        </Button>
      </ScrollView>
    </UserLayout>
  );
};

export { ProfileScreen };
