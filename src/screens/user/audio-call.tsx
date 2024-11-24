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
import { tw } from "~/lib/tailwind";
import { UserStackScreenProps } from "~/navigations/types";

const reportText = {
  police: "Calape PNP",
  medical: "Calape Hospital",
  fire: "Calape BFP",
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
    <UserLayout style={tw`flex-1`}>
      <View style={tw`flex-1 items-center justify-center gap-4 p-4`}>
        <View style={tw`rounded-full border p-4`}>
          <Icon size={64} style={tw`text-black`} />
        </View>

        <View style={tw`items-center gap-2`}>
          <Text style={tw`text-center`}>Calling...</Text>
          <Text style={tw`text-center text-lg`}>{reportText[type]}</Text>
        </View>
      </View>

      <View style={tw`flex-row items-center justify-center justify-around p-4`}>
        <View style={tw`overflow-hidden rounded-full`}>
          <Pressable
            style={tw`rounded-full border p-4`}
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideMessageSquareText size={24} style={tw`text-black`} />
          </Pressable>
        </View>

        <View style={tw`overflow-hidden rounded-full`}>
          <Pressable
            style={tw`rounded-full border p-4`}
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideMicOff size={24} style={tw`text-black`} />
          </Pressable>
        </View>

        <View style={tw`overflow-hidden rounded-full`}>
          <Pressable
            style={tw`rounded-full border p-4`}
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideVolume2 size={24} style={tw`text-black`} />
          </Pressable>
        </View>

        <View style={tw`overflow-hidden rounded-full`}>
          <Pressable
            style={tw`rounded-full border p-4`}
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucideEllipsisVertical size={24} style={tw`text-black`} />
          </Pressable>
        </View>
      </View>

      <View style={tw`items-center justify-center p-4`}>
        <View style={tw`overflow-hidden rounded-full`}>
          <Pressable
            style={tw`rounded-full border bg-persian-red-600 p-4`}
            android_ripple={{
              color: "#000000",
              borderless: true,
            }}
          >
            <LucidePhone size={32} style={tw`text-white`} />
          </Pressable>
        </View>
      </View>
    </UserLayout>
  );
};

export { AudioCallScreen };
