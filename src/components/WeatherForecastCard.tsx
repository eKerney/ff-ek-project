import airportIcon from "../assets/airport.png";
import { ForeCastWeather } from "../types";

export const WeatherForecastCard = ({ styleProps, forecast }:
  { styleProps: string, forecast: ForeCastWeather[] }) => {

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-value text-2xl">Forecast Report</div>
        <div className="stat-desc text-secondary text-sm text-center">
          {
            forecast.length > 0 &&
            forecast.map((d: ForeCastWeather, i) =>
              <p key={d.dateStart + i}>{i + 1} - Time Offset: <b>{d.timeOffset}</b> hrs&nbsp;&nbsp;
                Wind Spd (mph): <b>{d.windSpeedMPH.toFixed(1)}</b>&nbsp;&nbsp;
                Wind Dir (deg true): <b>{d.windDirDeg}</b></p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default WeatherForecastCard
