import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LucideFlame,
  LucideMessageCircleMore,
  LucidePhone,
  LucideShieldPlus,
  LucideSiren,
  LucideVideo,
} from "lucide-react-native";
import { Alert, Image, Text, View } from "react-native";

import { Button } from "~/components/button";
import { UserLayout } from "~/components/layout/user-layout";
import { sendNotification } from "~/lib/api";
import { createReport } from "~/lib/firebase/firestore";
import { getGeolocation } from "~/lib/geolocation";
import { tw } from "~/lib/tailwind";
import { UserStackScreenProps } from "~/navigations/user-stack";
import { ReportTypeSchema } from "~/schema/report";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const reportText = {
  police: "PNP",
  medical: "NDRRMC",
  fire: "BFP",
};

const reportIcon = {
  police: LucideSiren,
  medical: LucideShieldPlus,
  fire: LucideFlame,
};

const reportAgencyImages = {
  police: require("~/assets/images/pnp.png"),
  medical: require("~/assets/images/ndrrmc.png"),
  fire: require("~/assets/images/bfp.png"),
};

const ReportScreen = () => {
  const [loading, setLoading] = useState<ReportTypeSchema | null>(null);

  const navigation = useNavigation();
  const { params } = useRoute<UserStackScreenProps<"Report">["route"]>();
  const { type } = params;

  const { userData } = useAppSelector((state) => state.user);

  const Icon = reportIcon[type];
  const imageSrc = reportAgencyImages[type];

  const handleCreateReport = async (reportType: ReportTypeSchema) => {
    if (!userData) return Alert.alert("Failed", "No user data found.");

    setLoading(reportType);

    try {
      const { latitude, longitude } = await getGeolocation();

      const reportId = await createReport({
        userId: userData.id,
        status: "pending",
        type: reportType,
        agency: type,
        latitude,
        longitude,
      });

      await sendNotification({
        receiver: type,
        sender: userData.id,
        title: "Attention",
        body: "Possible emergency, please be prepared.",
        type: "report",
        typeId: reportId,
      });

      await sendNotification({
        receiver: "relatives",
        sender: userData.id,
        title: "Attention",
        body: `Your relative ${userData.name} has a ${type} emergency. Plase be advised.`,
        type: "report",
        typeId: reportId,
      });

      navigation.navigate("User", {
        screen: "Messages",
        params: { id: reportId, type },
      });
    } catch (error) {
      const err = getError(error, "Failed creating report.");

      Alert.alert("Failed", err.message);
    }

    setLoading(null);
  };

  return (
    <UserLayout style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center gap-8 p-4`}>
        <View style={tw`w-full items-center justify-center gap-2 flex-1`}>
          <Image source={imageSrc} style={tw`h-42 w-42`} />

          <Text style={tw`text-center text-2xl`}>{reportText[type]}</Text>
        </View>

        <View style={tw`w-full gap-2`}>
          <Button
            loading={loading === "video"}
            onPress={() =>
              navigation.navigate("User", {
                screen: "VideoCall",
                params: { id: "", type },
              })
            }
          >
            <LucideVideo size={20} style={tw`text-white`} />

            <Text style={tw`text-center text-white text-xs`}>Video Call</Text>
          </Button>

          <Button
            loading={loading === "voice"}
            onPress={() =>
              navigation.navigate("User", {
                screen: "AudioCall",
                params: { id: "", type },
              })
            }
          >
            <LucidePhone size={20} style={tw`text-white`} />

            <Text style={tw`text-center text-white text-xs`}>Phone Call</Text>
          </Button>

          <Button
            loading={loading === "message"}
            onPress={() =>
              Alert.alert(
                "Report",
                "This will create a report, do you want to continue?",
                [
                  {
                    text: "Yes",
                    onPress: () => handleCreateReport("message"),
                  },
                  {
                    text: "No",
                  },
                ],
              )
            }
          >
            <LucideMessageCircleMore size={20} style={tw`text-white`} />

            <Text style={tw`text-center text-white text-xs`}>Message</Text>
          </Button>
        </View>
      </View>
    </UserLayout>
  );
};

export { ReportScreen };
