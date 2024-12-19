import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AirportData, FetchTypes } from "../types";

export const useTransformData = (
  selectedAirport: string,
  fetchType: FetchTypes,
  responseData: any,
) => {
  let airportData: AirportData = {
    id: '...',
    name: 'select airport',
    runways: [],
    coords: []
  }

  const parseAirportData = (res) => {
    // console.log(selectedAirport, fetchType, res)
    return {
      id: res.faaCode,
      name: res.displayName,
      runways: res.runways?.map(d => d.ident),
      coords: [res.latitude, res.longitude]
    }
  };

  // const parseWeatherData = (responseData) => {
  // };

  switch (fetchType) {
    case "AIRPORT_INFO":
      airportData = 'displayName' in responseData
        ? parseAirportData(responseData)
        : airportData;
      break;
      // case "AIRPORT_WEATHER":
      //   selectedAirport && parseWeatherData(responseData);
      break;
    default:
      console.error('INVALID FETCHTYPE', fetchType)
  }
  return airportData;

}
