import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  LucideEllipsisVertical,
  LucideFlame,
  LucideMessageSquareText,
  LucideMicOff,
  LucidePhone,
  LucideShieldPlus,
  LucideSiren,
  LucideVolume2,
  LucideX,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useMicrophonePermission } from "react-native-vision-camera";

import { UserLayout } from "~/components/layout/user-layout";
import { UserStackScreenProps } from "~/navigations/root-stack/user-stack";

const reportText = {
  police: "PNP",
  medical: "LDRRMO",
  fire: "BFP",
  "": "",
};

const reportIcon = {
  police: LucideSiren,
  medical: LucideShieldPlus,
  fire: LucideFlame,
  "": LucideX,
};

const AudioCallScreen = () => {
  const { params } = useRoute<UserStackScreenProps<"AudioCall">["route"]>();
  const { type } = params;

  const Icon = reportIcon[type];

  const { requestPermission: reqMicPerm } = useMicrophonePermission();

  useEffect(() => {
    reqMicPerm();
  }, [reqMicPerm]);

  return (
    <UserLayout
      className="flex-1"
      title={`${reportText[type]} Phone Call Report`}
      hideProfile
    >
      <View className="flex-1 items-center justify-center gap-4 p-4">
        <View className="rounded-full border p-4">
          <Icon size={64} className="text-black" />
        </View>

        <View className="items-center gap-2">
          <Text className="text-center">Calling...</Text>
          <Text className="text-center text-lg">{reportText[type]}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center justify-around p-4">
        <View className="overflow-hidden rounded-full">
          <Pressable
            className="rounded-full border p-4"
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideMessageSquareText size={24} className="text-black" />
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-full">
          <Pressable
            className="rounded-full border p-4"
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideMicOff size={24} className="text-black" />
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-full">
          <Pressable
            className="rounded-full border p-4"
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideVolume2 size={24} className="text-black" />
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-full">
          <Pressable
            className="rounded-full border p-4"
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideEllipsisVertical size={24} className="text-black" />
          </Pressable>
        </View>
      </View>

      <View className="items-center justify-center p-4">
        <View className="overflow-hidden rounded-full">
          <Pressable
            className="rounded-full border bg-persian-red-600 p-4"
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucidePhone size={32} className="text-white" />
          </Pressable>
        </View>
      </View>
    </UserLayout>
  );
};

export { AudioCallScreen };
