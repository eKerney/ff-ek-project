/////////////////////
/// GENERAL TYPES ///


import { Deck, Layer, LayerProps, LineLayer, PolygonLayer } from "deck.gl";
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

export type RunwayGeom = Position[][];

export type RunwayGeomArr = Position[];


export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER" | "AIRPORT_FORECAST" | "MAP_RUNWAY" | "";

export type DeckColor = [number, number, number, number?];

export type DeckValue = number | string;

export type DeckData = PointData | LineData;

export type Position = [number, number, number?]

interface PointData {
  position: Position;
  color?: DeckColor;
  value?: DeckValue;
}

interface LineData {
  source: PointData;
  target: PointData;
  color: DeckColor;
  value?: DeckValue;
}

export interface BaseLayer {
  id: string;
  data: DeckData;
  pickable: boolean;
  autoHighlight: boolean;
  highlightColor: DeckColor;
  opacity: number;
  stroked: boolean;
}

type Accessor<T, R> = R | ((d: T) => R);

export interface DeckPointLayer extends BaseLayer {
  kind: LayerTypes.PointLayer
  getPosition: Accessor<PointData, Position>;
  getLineColor: Accessor<PointData, DeckColor>;
  getFillColor: Accessor<PointData, DeckColor>;
  getLineWidth: Accessor<PointData, number>;
};

export interface DeckLineLayer extends BaseLayer {
  kind: LayerTypes.LineLayer
  getColor: Accessor<PointData, DeckColor>;
  getSourcePosition: Accessor<PointData, Position>;
  getTargetPosition: Accessor<PointData, Position>;
};

export type DeckLayerTypes = DeckPointLayer | DeckLineLayer;

