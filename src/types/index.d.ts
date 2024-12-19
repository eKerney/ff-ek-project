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
}

export interface AirportData {
  id: string,
  name: string,
  runways: string[],
  coords: number[],
}

export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER";


