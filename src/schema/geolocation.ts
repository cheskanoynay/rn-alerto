import { z } from "zod";

export const geocodeLocalityInfoInformativeSchema = z.object({
  name: z.string(),
  description: z.string(),
  isoName: z.string().optional(),
  order: z.number(),
  isoCode: z.string().optional(),
  wikidataId: z.string().optional(),
  geonameId: z.number().optional(),
});
export type GeocodeLocalityInfoInformativeSchema = z.infer<
  typeof geocodeLocalityInfoInformativeSchema
>;

export const geocodeLocalityInfoAdministrativeSchema = z.object({
  name: z.string(),
  description: z.string(),
  isoName: z.string().optional(),
  order: z.number(),
  adminLevel: z.number().optional(),
  isoCode: z.string().optional(),
  wikidataId: z.string().optional(),
  geonameId: z.number().optional(),
});
export type GeocodeLocalityInfoAdministrativeSchema = z.infer<
  typeof geocodeLocalityInfoAdministrativeSchema
>;

export const geocodeLocalityInfoSchema = z.object({
  administrative: geocodeLocalityInfoAdministrativeSchema.array(),
  informative: geocodeLocalityInfoInformativeSchema.array(),
});
export type GeocodeLocalityInfoSchema = z.infer<
  typeof geocodeLocalityInfoSchema
>;

export const geocodeSchema = z.object({
  latitude: z.number(),
  lookupSource: z.string(),
  longitude: z.number(),
  localityLanguageRequested: z.string(),
  continent: z.string(),
  continentCode: z.string(),
  countryName: z.string(),
  countryCode: z.string(),
  principalSubdivision: z.string(),
  principalSubdivisionCode: z.string(),
  city: z.string(),
  locality: z.string(),
  postcode: z.string(),
  plusCode: z.string(),
  localityInfo: geocodeLocalityInfoSchema,
});
export type GeocodeSchema = z.infer<typeof geocodeSchema>;
