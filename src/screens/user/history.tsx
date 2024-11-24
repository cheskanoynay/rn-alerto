import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import _ from "lodash";
import { LucideChevronRight } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { UserLayout } from "~/components/layout/user-layout";
import { getReportsByRealtime } from "~/lib/firebase/firestore";
import { tw } from "~/lib/tailwind";
import {
  ReportAgencySchema,
  ReportSchema,
  ReportTypeSchema,
} from "~/schema/report";
import { useAppSelector } from "~/store";

const HistoryScreen = () => {
  const [reports, setReports] = useState<ReportSchema[]>([]);

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
    if (userData) {
      const unsubscribe = getReportsByRealtime({ userId: userData.id })(
        setReports,
      );

      return unsubscribe;
    }
  }, [userData]);

  return (
    <UserLayout title="History">
      <ScrollView contentContainerStyle={tw`gap-2 p-4`}>
        {sortedReports.map((r) => (
          <TouchableOpacity
            key={`report-${r.id}`}
            style={tw`h-14 flex-row items-center justify-between rounded-lg border px-4 py-2`}
            onPress={() => handleRedirect(r.id, r.type, r.agency)}
          >
            <View style={tw`flex-1`}>
              <Text>{`${r.type.toUpperCase()} REPORT`}</Text>

              <Text style={tw`text-xs text-gray-500`}>
                {format(r.dateCreated, "MMM dd, yyyy hh:mma")}
              </Text>
            </View>

            <LucideChevronRight style={tw`text-black`} size={16} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </UserLayout>
  );
};

export { HistoryScreen };
