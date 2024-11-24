import GetLocation from "react-native-get-location";

import { geocodeSchema } from "~/schema/geolocation";
import { getError } from "~/utils/error";

export const getReverseGeocodeClient = async (lat: number, long: number) => {
  try {
    const result = await fetch(
      `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
      {
        method: "GET",
      },
    ).then((r) => r.json());

    const { data, error } = geocodeSchema.safeParse(result);

    if (error) {
      console.log("getReverseGeocodeClient error:", error);
      throw new Error(error.issues[0].message);
    }

    return data;
  } catch (error) {
    console.log("getReverseGeocodeClient error:", error);
    const err = getError(error, "Failed getting geocode data.");

    throw err;
  }
};

export const getGeolocation = async () => {
  try {
    const { latitude, longitude } = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });

    return { latitude, longitude };
  } catch (error) {
    console.log("getGeolocation error:", error);
    const err = getError(error, "Failed getting geolocation.");

    throw err;
  }
};

// export const getLocation = async () => {
//   try {
//     const { latitude, longitude } = await getGeolocation();
//     const {city} = await getReverseGeocodeClient(latitude,longitude)

//   } catch (error) {
//     console.log("getLocation error:", error);
//     const err = getError(error, "Failed getting location.");

//     throw err;
//   }
// };
