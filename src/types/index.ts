/////////////////////
/// GENERAL TYPES ///


import { Layer } from "deck.gl";
import { components } from "./airport_api";
import { LayerTypes } from "./enums";

export interface Headers {
  "ff-coding-exercise": string,
  Authorization?: string,
};

export interface RequestConfig {
  method: 'get',
  maxBodyLength: number,
  url: string,
  headers: Headers,
};

export type RunwayGeom = (number | undefined)[][][];


export interface AirportData {
  id?: string,
  name?: string,
  runways: components['schemas']['Runway'][] | never[],
  runwayGeom: (number | undefined)[][][],
  coords: (number | undefined)[],
};

export interface CloudCover {
  coverage: string,
  altitudeFt: 4000,
  ceiling: true,
};

export interface CurrentWeather {
  temperatureF: number,
  relHumid: string,
  cloudCoverSum: CloudCover[],
  visibilStMi: number,
  windSpeedMPH: number,
  windDir: string | number,
};


export interface ForeCastWeather {
  dateStart: number,
  timeOffset: number,
  windSpeedMPH: number,
  windDirDeg: number,
};

export interface WeatherData {
  current: CurrentWeather
  forecast: ForeCastWeather[],
};

export interface Airport {
  code: string,
  icao: string,
  name: string,
  latitude: number,
  longitude: number,
  elevation: number,
  url: string | null,
  time_zone: string,
  city_code: string | null,
  country: string,
  city: string | null,
  state: string | null,
  county: string | null,
  type: string | null,
};

export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER" | "AIRPORT_FORECAST" | "MAP_RUNWAY" | "";


export interface DeckLineLayer extends Layer {
  kind: LayerTypes.LineLayer,
};

export interface DeckPolyLayer extends Layer {
  kind: LayerTypes.PolyLayer,
};

export type DeckLayers = DeckLineLayer | DeckPolyLayer;
