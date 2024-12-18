import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { RequestConfig } from "../types";
import AirPortCard from "./AirportCard";

export const LeftPanel = ({ selectedAirport }:
  { selectedAirport: string }
) => {
  const [airportData, setAirportData] = useState({});
  const [weatherData, setWeatherData] = useState({});

  // fetch airport info 
  useFetch(
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
    setAirportData
  );
  // fetch airport weather info
  useFetch(
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
    setWeatherData
  );

  return (
    <div id="LeftPanel" className="h-screen grid grid-rows-12 justify-left border-1 border-dark-grey-300 bg-elevation-0">
      <AirPortCard
        styleProps="row-span-4 border-2 border-dark-grey-300 bg-elevation-0"
        coords={[]}
      />
      <AirPortCard
        styleProps="row-span-4 border-2 border-dark-grey-300 bg-elevation-0"
        coords={[]}
      />
      <AirPortCard
        styleProps="row-span-4 border-2 border-dark-grey-300 bg-elevation-0"
        coords={[]}
      />
    </div>
  )
}

export default LeftPanel

