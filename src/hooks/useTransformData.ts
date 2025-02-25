import { AirportData, FetchTypes, ForeCastWeather, WeatherData } from "../types";
import { getWindDirection } from "../utilities/utilityFunctions";
import { components } from '../types/airport_api';
import { useEffect, useState } from "react";

export const useTransformData = (
  selectedAirport: string,
  fetchType: FetchTypes,
  responseData: any,
): AirportData | WeatherData => {

  const initTransformData = fetchType === 'AIRPORT_INFO'
    ? {
      id: '...',
      name: 'select airport',
      runways: [''],
      runwayGeom: [],
      coords: [0, 0],
      trigger: false
    }
    : {
      current: { temperatureF: 0, relHumid: '', cloudCoverSum: [], visibilStMi: 0, windSpeedMPH: 0, windDir: '' },
      forecast: [{ dateStart: 0, timeOffset: 0, windSpeedMPH: 0, windDirDeg: 0 }]
    } as WeatherData;
  const [transformData, setTransformData] = useState(initTransformData);


  const parseData = (res: components['schemas']['Airport']): AirportData | WeatherData => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        console.info('AIRPORT_INFO')

        setTransformData({
          id: res.faaCode,
          name: res.displayName,
          runways: (res.runways ?? []).map((d: components['schemas']['Runway']) => d.ident ?? ""),
          runwayGeomArr: (res.runways ?? []).map((d: components['schemas']['Runway']) => [[d.longitudeBase, d.latitudeBase], [d.longitudeRecip, d.latitudeRecip]]),
          coords: [res?.latitude, res?.longitude],
          trigger: true
        });
        break;
      case "AIRPORT_WEATHER":
        console.info('AIRPORT_WEATHER')
        const weather = res.report.conditions;
        const windSecCard = 'wind' in weather && 'direction' in weather.wind
          ? getWindDirection(Number(weather.wind.direction))
          : 'NO DATA';

        setTransformData({
          current: {
            temperatureF: Number(weather.tempC) * (9 / 5) + 32,
            relHumid: weather.relativeHumidity,
            cloudCoverSum: weather.cloudLayers,
            visibilStMi: weather.visibility.distanceSm,
            windSpeedMPH: 'wind' in weather ? (Number(weather.wind.speedKts) * 1.15078) : 0,
            windDir: windSecCard,
          },
          forecast: [{ dateStart: 0, timeOffset: 0, windSpeedMPH: 0, windDirDeg: 0 }],
          trigger: true
        });
        break;

      case "AIRPORT_FORECAST":
        console.info('AIRPORT_FORECAST')
        const forecast = res.report.forecast;
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
        setTransformData({
          current: { temperatureF: 0, relHumid: '', cloudCoverSum: [], visibilStMi: 0, windSpeedMPH: 0, windDir: '' },
          forecast: forecasts,
          trigger: true
        });
        break;
      default:
        return transformData as AirportData
    }
  }

  useEffect(() => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        'displayName' in responseData && selectedAirport
          ? parseData(responseData)
          : transformData;
        break;
      case "AIRPORT_WEATHER":
        'report' in responseData && 'conditions' in responseData.report && selectedAirport
          ? parseData(responseData)
          : transformData;
        break;
      case "AIRPORT_FORECAST":
        'report' in responseData && 'forecast' in responseData.report && selectedAirport
          ? parseData(responseData)
          : transformData;
        break;
      default:
        console.error('INVALID FETCHTYPE', fetchType)
    }
  }, [responseData]);

  return transformData;

}
