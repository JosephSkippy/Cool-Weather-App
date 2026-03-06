import { z } from "zod";

const WeatherItemSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const DailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

const DailyFeelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

const DailySchema = z.looseObject({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),

  summary: z.string().optional(),

  temp: DailyTempSchema,
  feels_like: DailyFeelsLikeSchema,

  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),

  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),

  weather: z.array(WeatherItemSchema),

  clouds: z.number().optional(),
  pop: z.number().optional(),
  uvi: z.number().optional(),
});

export const WeatherResponseSchema = z.looseObject({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),

  current: z.looseObject({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    weather: z.array(WeatherItemSchema),
  }),

  hourly: z.array(
    z.looseObject({
      dt: z.number(),
      temp: z.number(),
      feels_like: z.number(),
      pressure: z.number(),
      humidity: z.number(),
      dew_point: z.number(),
      uvi: z.number(),
      clouds: z.number(),
      visibility: z.number(),
      wind_speed: z.number(),
      wind_deg: z.number(),
      wind_gust: z.number().optional(),
      weather: z.array(WeatherItemSchema),
      pop: z.number().optional(),
    }),
  ),

  daily: z.array(DailySchema),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
