import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import _ from "lodash";
import { LucideChevronRight } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ResponderLayout } from "~/components/layout/responder-layout";
import { getReportsByRealtime } from "~/lib/firebase/firestore";
import { getReverseGeocodeClient } from "~/lib/geolocation";
import { tw } from "~/lib/tailwind";
import { ReportSchema, ReportTypeSchema } from "~/schema/report";
import { useAppSelector } from "~/store";

const ResponderHomeScreen = () => {
  const [reports, setReports] = useState<
    (ReportSchema & { location: string })[]
  >([]);

  const navigation = useNavigation();
  const { userData } = useAppSelector((state) => state.user);

  const sortedReports = _.sortBy(reports, (r) => r.dateCreated).reverse();

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
      <ScrollView contentContainerStyle={tw`gap-2 p-4`}>
        {sortedReports.map((r) => (
          <TouchableOpacity
            key={`report-${r.id}`}
            style={[
              tw`h-14 flex-row items-center justify-between rounded-lg px-4 py-2`,
              r.status === "pending"
                ? tw`bg-persian-red-600`
                : tw`bg-green-600`,
            ]}
            onPress={() => handleRedirect(r.id, r.type)}
          >
            <View style={[tw`flex-1`]}>
              <Text style={tw`text-white`}>
                {r.status === "pending" ? "NEED HELP!" : "RESPONDED"}
              </Text>

              <Text style={tw`text-xs text-white`}>
                {format(r.dateCreated, "MMM dd, yyyy hh:mma")} - {r.location} (
                {r.latitude}, {r.longitude})
              </Text>
            </View>

            <LucideChevronRight style={tw`text-white`} size={20} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ResponderLayout>
  );
};

export { ResponderHomeScreen };
