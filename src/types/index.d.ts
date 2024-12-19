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

export interface CurrentWeather {
  temperatureF: number,
  relHumid: string,
  cloudCoverSum: string,
  visibilStMi: number,
  windSpeedMPH: number,
  windDir: string | number,
}

export interface ForeCastWeather {
  timeOffset: string,
  windSpeedMPH: number,
  windDir: string | number,
}
export interface WeatherData {
  current: CurrentWeather
  forecast: ForeCastWeather[],
}



export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER";


