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
import { Alert, Text, View } from "react-native";

import { Button } from "~/components/button";
import { UserLayout } from "~/components/layout/user-layout";
import { sendNotification } from "~/lib/api";
import { createReport } from "~/lib/firebase/firestore";
import { getGeolocation } from "~/lib/geolocation";
import { tw } from "~/lib/tailwind";
import { UserStackScreenProps } from "~/navigations/types";
import { ReportTypeSchema } from "~/schema/report";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const reportText = {
  police: "Calape PNP",
  medical: "Calape Hospital",
  fire: "Calape BFP",
};

const reportIcon = {
  police: LucideSiren,
  medical: LucideShieldPlus,
  fire: LucideFlame,
};

const ReportScreen = () => {
  const [loading, setLoading] = useState<ReportTypeSchema | null>(null);

  const navigation = useNavigation();
  const { params } = useRoute<UserStackScreenProps<"Report">["route"]>();
  const { type } = params;

  const { userData } = useAppSelector((state) => state.user);

  const Icon = reportIcon[type];

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
        to: "all",
        from: userData.id,
        title: "Attention",
        body: "Possible emergency, please be prepared.",
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
      <View style={tw`flex-1 justify-center gap-4 p-4`}>
        <Text style={tw`text-center text-2xl`}>{reportText[type]}</Text>

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

          <Text style={tw`text-center text-white`}>Video Call</Text>
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

          <Text style={tw`text-center text-white`}>Phone Call</Text>
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

          <Text style={tw`text-center text-white`}>Message</Text>
        </Button>
      </View>

      <View style={tw`items-center gap-4 p-4`}>
        <View
          style={tw`h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white`}
        >
          <Icon size={32} style={tw`text-persian-red-600`} />
        </View>

        <Text style={tw`text-center text-xs uppercase`}>{type}</Text>
      </View>
    </UserLayout>
  );
};

export { ReportScreen };
