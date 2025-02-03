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
import { UserStackScreenProps } from "~/navigations/root-stack/user-stack";
import { ReportTypeSchema } from "~/schema/report";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

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

const reportAgencyImages = {
  police: require("~/assets/images/pnp.png"),
  medical: require("~/assets/images/ndrrmc.png"),
  fire: require("~/assets/images/bfp.png"),
};

const ReportTypeScreen = () => {
  const [loading, setLoading] = useState<ReportTypeSchema | null>(null);

  const navigation = useNavigation();
  const { params } = useRoute<UserStackScreenProps<"ReportType">["route"]>();
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

      navigation.navigate("UserStack", {
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
    <UserLayout className="flex-1">
      <View className="flex-1 justify-center gap-8 p-4">
        <View className="w-full flex-1 items-center justify-center gap-2">
          <Image source={imageSrc} className="h-42 w-42" />

          <Text className="text-center text-2xl">{reportText[type]}</Text>
        </View>

        <View className="w-full gap-2">
          <Button
            className="gap-2"
            loading={loading === "video"}
            onPress={() =>
              navigation.navigate("UserStack", {
                screen: "VideoCall",
                params: { id: "", type },
              })
            }
          >
            <LucideVideo className="text-white" color="#ffffff" />

            <Text className="text-center text-white">Video Call</Text>
          </Button>

          <Button
            className="gap-2"
            loading={loading === "voice"}
            onPress={() =>
              navigation.navigate("UserStack", {
                screen: "AudioCall",
                params: { id: "", type },
              })
            }
          >
            <LucidePhone className="text-white" color="#ffffff" />

            <Text className="text-center text-white">Phone Call</Text>
          </Button>

          <Button
            className="gap-2"
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
            <LucideMessageCircleMore className="text-white" color="#ffffff" />

            <Text className="text-center text-white">Message</Text>
          </Button>
        </View>
      </View>
    </UserLayout>
  );
};

export { ReportTypeScreen };
