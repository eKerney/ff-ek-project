import airportIcon from "../assets/airport.png";
export const AirPortCard = ({ styleProps, ID, name, runways, coords }:
  { styleProps: string, ID: string, name: string, runways: string[], coords: number[] }) => {

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-figure text-secondary absolute inset-x-96 inset-y-5">
          <div className="w-14 rounded-full">
            <img src={airportIcon} />
          </div>
        </div>
        <div className="stat-value">{ID}</div>
        <div className="stat-title text-xl">{name}</div>
        <div className="stat-desc text-secondary text-sm">{runways.map(d => ` ${d} `)}</div>
        <div className="stat-desc text-secondary text-sm ">{coords.map((d => ` ${d} `))}</div>
      </div>
    </div>
  )
}

export default AirPortCard

