import { useFetch } from "../hooks/useFetch";
import { AirportData, CurrentWeather, RunwayGeomArr, WeatherData } from "../types";
import AirPortCard from "./AirportCard";
import { useTransformData } from "../hooks/useTransformData";
import WeatherCard from "./WeatherCard";
import WeatherForecastCard from "./WeatherForecastCard";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useVisualize } from "../hooks/useVisualize";
import { LineLayer } from "deck.gl";

export const LeftPanel = ({ selectedAirport, callback }:
  {
    selectedAirport: string,
    callback: Dispatch<SetStateAction<LineLayer>>
  }
) => {
  const TOKEN = import.meta.env.VITE_TOKEN

  // *** AIRPORT DATA WORKFLOW *** //
  let airportData: AirportData = {
    id: '...',
    name: 'NAME',
    runways: ['1', '2'],
    runwayGeomArr: [],
    coords: [0, 0],
    trigger: false
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
        'Authorization': 'Basic ' + TOKEN,
      }
    },
  );

  // *** CURRENT WEATHER DATA WORKFLOW *** //
  let currentWeatherData: WeatherData = {
    current: {} as CurrentWeather,
    forecast: [],
    trigger: false
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

  // *** FORECAST WEATHER DATA WORKFLOW *** //
  let forecastWeatherData: WeatherData = {
    current: {} as CurrentWeather,
    forecast: [],
    trigger: false,
  }
  // No new fetch required, data availavailable in weatherResponse

  airportData = useTransformData(selectedAirport, "AIRPORT_INFO", airportResponse) as AirportData;
  currentWeatherData = useTransformData(selectedAirport, "AIRPORT_WEATHER", weatherResponse) as WeatherData;
  forecastWeatherData = useTransformData(selectedAirport, "AIRPORT_FORECAST", weatherResponse) as WeatherData;

  useEffect(() => console.info('airportData'), [airportData]);
  useEffect(() => console.info('currentWeatherData'), [currentWeatherData]);
  useEffect(() => console.info('forecastWeatherData'), [forecastWeatherData]);

  const runwayLayer = useVisualize('MAP_RUNWAY', airportData.runwayGeomArr, forecastWeatherData.trigger, selectedAirport);

  useEffect(() => console.info('runway changed', runwayLayer?.props?.data), [runwayLayer?.props?.id]);
  useEffect(() => callback(runwayLayer), [runwayLayer?.props?.id]);

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
        weather={currentWeatherData.current}
      />
      <WeatherForecastCard
        styleProps="row-span-4 border-2 rounded-none border-dark-grey-300 bg-elevation-0"
        forecast={forecastWeatherData.forecast}
      />
    </div>
  )
}

export default LeftPanel

