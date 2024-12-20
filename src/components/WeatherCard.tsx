import { CloudCover, CurrentWeather } from "../types";

export const WeatherCard = ({ styleProps, weather }:
  { styleProps: string, weather: CurrentWeather }) => {

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-value text-2xl">Current Weather</div>
        <div className="stat-title text-lg">
          Temp(F): <b>{weather.temperatureF.toFixed(2)}&nbsp;&nbsp;</b>
          Rel Humidity: <b>{weather.relHumid}%&nbsp;&nbsp;</b>
          Vis(StMi): <b>{weather.visibilStMi}</b>
        </div>
        <div className="stat-title text-lg">
          Wind Speed (mph): <b>{weather.windSpeedMPH.toFixed(1)}&nbsp;&nbsp;</b>
          Wind Direction: <b>{weather.windDir}</b>
        </div>
        <div className="stat-desc text-secondary text-lg text-center">
          Cloud Coverage Summary&nbsp;
          {weather.cloudCoverSum.length > 0 &&
            weather.cloudCoverSum.map((d: CloudCover, i) =>
              <p key={d.altitudeFt}>Layer {i + 1}: <b>{d.coverage}</b>&nbsp;&nbsp; <b>{d.altitudeFt}</b>ft&nbsp;&nbsp; ceiling: <b>{String(d.ceiling)}</b></p>)}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

