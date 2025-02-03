import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import _ from "lodash";
import { LucideCheck, LucideEye } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ResponderLayout } from "~/components/layout/responder-layout";
import { getReportsByRealtime, updateReport } from "~/lib/firebase/firestore";
import { getReverseGeocodeClient } from "~/lib/geolocation";
import { ReportSchema, ReportTypeSchema } from "~/schema/report";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";
import { cn } from "~/utils/style";

const ResponderHomeScreen = () => {
  const [reports, setReports] = useState<
    (ReportSchema & { location: string })[]
  >([]);

  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  const sortedReports = _.sortBy(reports, (r) => r.dateCreated).reverse();

  const handleUpdateStatus = async (id: string) => {
    try {
      await updateReport(id, { status: "responded" });

      Alert.alert("Success", "Successfully responded.");
    } catch (error) {
      const err = getError(error);

      Alert.alert("Failed", err.message);
    }
  };

  const handleRedirect = (id: string, type: ReportTypeSchema) => {
    switch (type) {
      case "message": {
        navigation.navigate("Responders", {
          screen: "Messages",
          params: { id },
        });
        break;
      }
    }
  };

  useEffect(() => {
    if (userData && userData.responderType !== "") {
      const unsubscribe = getReportsByRealtime({
        agency: userData.responderType,
      })(async (reportsArr) => {
        const promises = reportsArr.map(async (r) => {
          const location = await getReverseGeocodeClient(
            r.latitude,
            r.longitude,
          );

          // console.log(JSON.stringify(location));

          return {
            ...r,
            location: location.city,
          };
        });

        const reportsWithLocation = await Promise.all(promises);

        setReports(reportsWithLocation);
      });

      return unsubscribe;
    }
  }, [userData]);

  return (
    <ResponderLayout>
      {/* <View className="flex-row gap-1 p-4">
        <Button size="sm">Alerts</Button>

        <Button size="sm" color="green">
          Responded
        </Button>

        <Button size="sm" color="gray">
          All
        </Button>
      </View> */}
      <ScrollView contentContainerClassName="gap-2 p-4">
        {sortedReports.map((r) => (
          <View
            key={`report-${r.id}`}
            className={cn(
              "flex-row items-center justify-between rounded-2xl px-4 py-3",
              r.status === "pending" ? "bg-persian-red-600" : "bg-green-600",
            )}
          >
            <View className="flex-1">
              <Text className="text-white">
                {r.status === "pending" ? "NEED HELP!" : "RESPONDED"}
              </Text>

              <Text className="text-white">
                {format(r.dateCreated, "MMM dd, yyyy hh:mma")} - {r.location} (
                {r.latitude}, {r.longitude})
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              {r.status === "pending" && (
                <TouchableOpacity onPress={() => handleUpdateStatus(r.id)}>
                  <LucideCheck className="text-white" size={20} />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => handleRedirect(r.id, r.type)}>
                <LucideEye className="text-white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ResponderLayout>
  );
};

export { ResponderHomeScreen };
