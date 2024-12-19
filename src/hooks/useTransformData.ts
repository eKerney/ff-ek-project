import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AirportData, FetchTypes, WeatherData } from "../types";

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
      forecast: [{ timeOffset: '', windSpeedMPH: 0, windDir: '' }]
    } as WeatherData;

  const getWindDirection = (wind: number): string => {
    const windDirections = [
      { direction: "N", min: 348.75, max: 11.25 },
      { direction: "NNE", min: 11.25, max: 33.75 },
      { direction: "NE", min: 33.75, max: 56.25 },
      { direction: "ENE", min: 56.25, max: 78.75 },
      { direction: "E", min: 78.75, max: 101.25 },
      { direction: "ESE", min: 101.25, max: 123.75 },
      { direction: "SE", min: 123.75, max: 146.25 },
      { direction: "SSE", min: 146.25, max: 168.75 },
      { direction: "S", min: 168.75, max: 191.25 },
      { direction: "SSW", min: 191.25, max: 213.75 },
      { direction: "SW", min: 213.75, max: 236.25 },
      { direction: "WSW", min: 236.25, max: 258.75 },
      { direction: "W", min: 258.75, max: 281.25 },
      { direction: "WNW", min: 281.25, max: 303.75 },
      { direction: "NW", min: 303.75, max: 326.25 },
      { direction: "NNW", min: 326.25, max: 348.75 }
    ];

    const direction = windDirections.find(dir =>
      (wind >= dir.min && wind < dir.max) ||
      (dir.min > dir.max && (wind >= dir.min || wind < dir.max))
    );
    return direction ? direction.direction : "NO DATA";
  }

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
        // console.log('weather', weather);
        const windSecCard = 'wind' in weather && 'direction' in weather.wind
          ? getWindDirection(Number(weather.wind.direction))
          : 'NO DATA';

        return {
          current: {
            temperatureF: Number(weather.tempC) * (9 / 5) + 32,
            relHumid: weather.relativeHumidity,
            cloudCoverSum: weather.cloudLayers,
            visibilStMi: weather.visibility.distanceSm,
            windSpeedMPH: (Number(weather.wind.speedKts) * 1.15078),
            windDir: windSecCard,
          },
          forecast: [{ timeOffset: '', windSpeedMPH: 0, windDir: '' }]
        };
      default:
        return {} as AirportData
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
    default:
      console.error('INVALID FETCHTYPE', fetchType)
  }
  return transformData;

}