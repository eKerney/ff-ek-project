import { AirportData, FetchTypes, ForeCastWeather, WeatherData } from "../types";
import { getWindDirection } from "../utilities/utilityFunctions";

export const useTransformData = (
  selectedAirport: string,
  fetchType: FetchTypes,
  responseData: any,
): AirportData | WeatherData => {

  let transformData = fetchType === 'AIRPORT_INFO'
    ? {
      id: '...',
      name: 'select airport',
      runways: [''],
      coords: [0, 0]
    }
    : {
      current: { temperatureF: 0, relHumid: '', cloudCoverSum: [], visibilStMi: 0, windSpeedMPH: 0, windDir: '' },
      forecast: [{ dateStart: 0, timeOffset: 0, windSpeedMPH: 0, windDirDeg: 0 }]
    } as WeatherData;

  const parseData = (res): AirportData | WeatherData => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        return {
          id: res.faaCode,
          name: res.displayName,
          runways: res.runways?.map(d => d.ident),
          coords: [res.latitude, res.longitude]
        }
      case "AIRPORT_WEATHER":
        const weather = res.report.conditions;
        const windSecCard = 'wind' in weather && 'direction' in weather.wind
          ? getWindDirection(Number(weather.wind.direction))
          : 'NO DATA';

        return {
          current: {
            temperatureF: Number(weather.tempC) * (9 / 5) + 32,
            relHumid: weather.relativeHumidity,
            cloudCoverSum: weather.cloudLayers,
            visibilStMi: weather.visibility.distanceSm,
            windSpeedMPH: 'wind' in weather ? (Number(weather.wind.speedKts) * 1.15078) : 0,
            windDir: windSecCard,
          },
          forecast: [{ dateStart: 0, timeOffset: 0, windSpeedMPH: 0, windDirDeg: 0 }]
        };
      case "AIRPORT_FORECAST":
        const forecast = res.report.forecast;
        // const dateStartTxt = new Date(forecast.period.dateStart);
        const dateStartNum = Date.parse(forecast.period.dateStart);
        const conditions = forecast.conditions;

        const forecasts: ForeCastWeather[] = 'wind' in conditions[0]
          ? conditions.map(d => {
            const period: ForeCastWeather = {
              dateStart: Date.parse(d.period.dateStart),
              timeOffset: (Date.parse(d.period.dateStart) - dateStartNum) / (1000 * 60 * 60),
              windSpeedMPH: (Number(d.wind.speedKts) * 1.15078),
              windDirDeg: (d.wind.direction),
            }
            return period
          })
          : [{ dateStart: 0, timeOffset: 0, windSpeedMPH: 0, windDirDeg: 0 }];
        return {
          current: { temperatureF: 0, relHumid: '', cloudCoverSum: [], visibilStMi: 0, windSpeedMPH: 0, windDir: '' },
          forecast: forecasts,
        }
      default:
        return transformData as AirportData
    }
  }

  switch (fetchType) {
    case "AIRPORT_INFO":
      transformData = 'displayName' in responseData
        ? parseData(responseData)
        : transformData;
      break;
    case "AIRPORT_WEATHER":
      transformData = 'report' in responseData && 'conditions' in responseData.report
        ? parseData(responseData)
        : transformData;
      break;
    case "AIRPORT_FORECAST":
      transformData = 'report' in responseData && 'forecast' in responseData.report
        ? parseData(responseData)
        : transformData;
      break;
    default:
      console.error('INVALID FETCHTYPE', fetchType)
  }
  return transformData;

}
