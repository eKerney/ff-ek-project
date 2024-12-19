import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AirportData, CurrentWeather, ForeCastWeather, WeatherData } from "../types";
import AirPortCard from "./AirportCard";
import { useTransformData } from "../hooks/useTransformData";
import WeatherCard from "./WeatherCard";

export const LeftPanel = ({ selectedAirport }:
  { selectedAirport: string }
) => {

  let airportData: AirportData = {
    id: '...',
    name: 'NAME',
    runways: ['1', '2'],
    coords: [0, 0]
  }
  // fetch airport info 
  const airportResponse = useFetch(
    selectedAirport,
    "AIRPORT_INFO",
    {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/airports/' + selectedAirport,
      headers: {
        'ff-coding-exercise': '1',
        'Authorization': 'Basic ZmYtaW50ZXJ2aWV3OkAtKkt6VS4qZHRQOWRrb0U3UHJ5TDJvalkhdURWLjZKSkdDOQ=='
      }
    },
  );

  let weatherData: WeatherData = {
    current: {} as CurrentWeather,
    forecast: [],
  }
  // fetch airport weather info
  const weatherResponse = useFetch(
    selectedAirport,
    "AIRPORT_WEATHER",
    {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/weather/report/' + selectedAirport,
      headers: {
        'ff-coding-exercise': '1',
      }
    },
  );

  airportData = useTransformData(selectedAirport, "AIRPORT_INFO", airportResponse) as AirportData;
  weatherData = useTransformData(selectedAirport, "AIRPORT_WEATHER", weatherResponse) as WeatherData;
  // useEffect(() => console.log('airportResponse', airportResponse), [airportResponse])
  // useEffect(() => console.log('weatherResponse', weatherResponse), [weatherResponse]);
  useEffect(() => console.log('weatherdata', weatherData.current.cloudCoverSum), [weatherData]);

  return (
    <div id="LeftPanel" className="h-screen grid grid-rows-12 justify-left border-1 border-dark-grey-300 bg-elevation-0">
      <AirPortCard
        styleProps="row-span-4 border-2 rounded-none border-dark-grey-300 bg-elevation-0"
        coords={airportData.coords ?? []}
        name={airportData.name ?? ''}
        runways={airportData.runways ?? []}
        ID={airportData.id ?? ''}
      />
      <WeatherCard
        styleProps="row-span-4 border-2 rounded-none border-dark-grey-300 bg-elevation-0"
        weather={weatherData.current}
      />
    </div>
  )
}

export default LeftPanel

