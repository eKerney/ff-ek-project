import { useFetch } from "../hooks/useFetch";
import { RequestConfig } from "../types";
import AirPortCard from "./AirportCard";

export const LeftPanel = ({ selectedAirport }:
  { selectedAirport: string }
) => {
  useFetch(selectedAirport, "AIRPORT_INFO", {} as RequestConfig);

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

