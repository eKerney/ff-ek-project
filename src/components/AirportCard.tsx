import airportIcon from "../assets/airport.png";
export const AirPortCard = ({ styleProps, ID, name, runways, coords }:
  { styleProps: string, ID: string, name: string, runways: string[], coords: number[] }) => {

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-figure text-secondary absolute left-[400px] top-[30px]  ">
          <div className="w-14 rounded-full">
            <img src={airportIcon} />
          </div>
        </div>
        <div className="stat-value">{ID}</div>
        <div className="stat-title text-xl">{name}</div>
        <div className="stat-title text-secondary text-md">
          Runways:&nbsp;&nbsp;
          {runways.map(d => `${d} | `)}
        </div>
        <div className="stat-desc text-secondary text-lg ">
          Lat/Long:&nbsp;&nbsp;
          {coords.map(((d, i) =>
            `${i == 0 ? '(' : ''} ${d.toFixed(7)}${i == 0 ? ',' : ''}${i == 1 ? ')' : ''} `))}
        </div>
      </div>
    </div>
  )
}

export default AirPortCard

