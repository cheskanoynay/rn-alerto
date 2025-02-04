import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import _ from "lodash";
import { LucideCheck, LucideEye } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";
import { getReportsByRealtime } from "~/lib/firebase/firestore";
import { getReverseGeocodeClient } from "~/lib/geolocation";
import { tw } from "~/lib/tailwind";
import {
  ReportAgencySchema,
  ReportSchema,
  ReportTypeSchema,
} from "~/schema/report";
import { useAppSelector } from "~/store";

const RecentActivitiesScreen = () => {
  const [reports, setReports] = useState<
    (ReportSchema & { location: string })[]
  >([]);

  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  const sortedReports = _.sortBy(reports, (r) => r.dateCreated).reverse();

  const handleRedirect = (
    id: string,
    type: ReportTypeSchema,
    agency: ReportAgencySchema,
  ) => {
    switch (type) {
      case "message": {
        navigation.navigate("User", {
          screen: "Messages",
          params: { id, type: agency },
        });
        break;
      }
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      const unsubscribe = getReportsByRealtime({ userId: userData.id })(async (
        reportsArr,
      ) => {
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
    <UserLayout title="Recent Activities">
      <ScrollView contentContainerStyle={tw`gap-2 p-4`}>
        {sortedReports.map((r) => (
          <View
            key={`report-${r.id}`}
            style={[
              tw`flex-row items-center justify-between rounded-2xl px-4 py-3`,
              r.status === "pending"
                ? tw`bg-persian-red-600`
                : tw`bg-green-600`,
            ]}
          >
            <View style={[tw`flex-1`]}>
              <Text style={tw`text-white`}>
                [{r.agency.toUpperCase()}] -{" "}
                {r.status === "pending" ? "NEED HELP!" : "RESPONDED"}
              </Text>

              <Text style={tw`text-white`}>
                {format(r.dateCreated, "MMM dd, yyyy hh:mma")} - {r.location} (
                {r.latitude}, {r.longitude})
              </Text>
            </View>

            <View style={tw`flex-row items-center gap-2`}>
              <TouchableOpacity
                onPress={() => handleRedirect(r.id, r.type, r.agency)}
              >
                <LucideEye style={tw`text-white`} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </UserLayout>
  );
};

export { RecentActivitiesScreen };
