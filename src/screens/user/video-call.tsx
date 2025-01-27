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
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

import { UserLayout } from "~/components/layout/user-layout";
import { tw } from "~/lib/tailwind";
import { UserStackScreenProps } from "~/navigations/user-stack";

const reportText = {
  police: "PNP",
  medical: "LDRRMO",
  fire: "BFP",
};

const reportIcon = {
  police: LucideSiren,
  medical: LucideShieldPlus,
  fire: LucideFlame,
};

const VideoCallScreen = () => {
  const { params } = useRoute<UserStackScreenProps<"VideoCall">["route"]>();
  const { type } = params;

  const { hasPermission: hasCamPerm, requestPermission: reqCamPerm } =
    useCameraPermission();
  const { requestPermission: reqMicPerm } = useMicrophonePermission();

  const device = useCameraDevice("back");

  const Icon = reportIcon[type];

  useEffect(() => {
    reqCamPerm();
    reqMicPerm();
  }, [reqCamPerm, reqMicPerm]);

  return (
    <UserLayout style={tw`relative flex-1`}>
      {hasCamPerm && device && (
        <View style={tw`absolute bottom-0 left-0 right-0 top-0 h-full w-full`}>
          <Camera style={tw`h-full w-full`} device={device} isActive={true} />
        </View>
      )}

      <View style={tw`flex-1 bg-black/50`}>
        <View style={tw`flex-1 items-center justify-center gap-4 p-4`}>
          <View style={tw`rounded-full border border-white p-4`}>
            <Icon size={64} style={tw`text-white`} />
          </View>

          <View style={tw`items-center gap-2`}>
            <Text style={tw`text-center text-white`}>Calling...</Text>
            <Text style={tw`text-center text-lg text-white`}>
              {reportText[type]}
            </Text>
          </View>
        </View>

        <View
          style={tw`flex-row items-center justify-center justify-around p-4`}
        >
          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`rounded-full border border-white p-4`}
              android_ripple={{
                color: "#ffffff",
                borderless: true,
              }}
            >
              <LucideMessageSquareText size={24} style={tw`text-white`} />
            </Pressable>
          </View>

          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`rounded-full border border-white p-4`}
              android_ripple={{
                color: "#ffffff",
                borderless: true,
              }}
            >
              <LucideMicOff size={24} style={tw`text-white`} />
            </Pressable>
          </View>

          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`rounded-full border border-white p-4`}
              android_ripple={{
                color: "#ffffff",
                borderless: true,
              }}
            >
              <LucideVolume2 size={24} style={tw`text-white`} />
            </Pressable>
          </View>

          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`rounded-full border border-white p-4`}
              android_ripple={{
                color: "#ffffff",
                borderless: true,
              }}
            >
              <LucideEllipsisVertical size={24} style={tw`text-white`} />
            </Pressable>
          </View>
        </View>

        <View style={tw`items-center justify-center p-4`}>
          <View style={tw`overflow-hidden rounded-full`}>
            <Pressable
              style={tw`rounded-full border border-white bg-persian-red-600 p-4`}
              android_ripple={{
                color: "#ffffff",
                borderless: true,
              }}
            >
              <LucidePhone size={32} style={tw`text-white`} />
            </Pressable>
          </View>
        </View>
      </View>
    </UserLayout>
  );
};

export { VideoCallScreen };
