import { DeckMap } from "./DeckMap";
import { GenericSelect } from "./GenericSelect";
import LeftPanel from "./LeftPanel";
import airportList from "../data/us_airports.json";
import { useEffect, useState } from "react";

export const BaseLayout = () => {
  const [selectedAirport, setSelectedAirport] = useState<string>('')
  const IDs: string[] = airportList.map(d => d.code);
  useEffect(() => console.log('baselayout', selectedAirport), [selectedAirport]);

  return (
    <>
      <div className="grid grid-cols-12 gap-0 h-screen overflow-hidden ">
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-4" >
          <LeftPanel
            selectedAirport={selectedAirport}
          />
        </div>
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-8" >
          <GenericSelect
            choices={IDs}
            title=""
            defaultChoice={'Select Airport'}
            callback={setSelectedAirport}
            value=""
          />
          <DeckMap />
        </div>
      </div>
    </>
  );
}
export default BaseLayout
