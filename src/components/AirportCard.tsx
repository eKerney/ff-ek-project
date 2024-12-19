export const AirPortCard = ({ styleProps, ID, name, runways, coords }:
  { styleProps: string, ID: string, name: string, runways: string[], coords: number[] }) => {
  // ID = ID ? ID : "";
  // name = name ? name : "";
  // runways = runways ? runways : ["09R-27L", "03L-21R", "04R-22L", "03R-21L", "04L-22R", "09L-27R"];
  // coords = coords.length > 0 ? coords : [42.205699, -83.352975];
  console.log(ID, name, runways, coords)

  return (
    <div className={`stats shadow ${styleProps}`}>
      <div className="stat place-items-center">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
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

