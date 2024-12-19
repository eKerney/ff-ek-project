/////////////////////
/// GENERAL TYPES ///
/////////////////////

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
  id: string,
  name: string,
  runways: string[],
  coords: number[],
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
  windDirDeg: numer,
};

export interface WeatherData {
  current: CurrentWeather
  forecast: ForeCastWeather[],
};


export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER" | "AIRPORT_FORECAST";


