import airportIcon from "../assets/airport.png";
import { ForeCastWeather } from "../types";

export const WeatherForecastCard = ({ styleProps, forecast }:
  { styleProps: string, forecast: ForeCastWeather[] }) => {

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-figure text-secondary absolute inset-x-96 inset-y-5">
          <div className="w-14 rounded-full">
            <img src={airportIcon} />
          </div>
        </div>
        <div className="stat-value text-2xl">Forecast Report</div>
        <div className="stat-desc text-secondary text-lg text-center">
          {
            weather.length
          }

          {/* weather.cloudCoverSum.length > 0 &&
            weather.cloudCoverSum.map((d: CloudCover, i) =>
              <p>Layer {i + 1}: <b>{d.coverage}</b>&nbsp;&nbsp; <b>{d.altitudeFt}</b>ft&nbsp;&nbsp; ceiling: <b>{String(d.ceiling)}</b></p>) */}
        </div>
      </div>
    </div>
  )
}

export default WeatherForecastCard
// <div className="stat-title text-lg">
//   Temperature(F): <b>{weather.temperatureF}&nbsp;&nbsp;</b>
//   Relative Humidity: <b>{weather.relHumid}%&nbsp;&nbsp;</b>
//   Vis(StMi): <b>{weather.visibilStMi}</b>
// </div>
// <div className="stat-title text-lg">
//   Wind Speed (mph): <b>{weather.windSpeedMPH.toFixed(1)}&nbsp;&nbsp;</b>
//   Wind Direction: <b>{weather.windDir}</b>
// </div>
// <div className="stat-desc text-secondary text-lg text-center">
//   Cloud Coverage Summary&nbsp;
//   {weather.cloudCoverSum.length > 0 &&
//     weather.cloudCoverSum.map((d: CloudCover, i) =>
//       <p>Layer {i + 1}: <b>{d.coverage}</b>&nbsp;&nbsp; <b>{d.altitudeFt}</b>ft&nbsp;&nbsp; ceiling: <b>{String(d.ceiling)}</b></p>)}
// </div>
