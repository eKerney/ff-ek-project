import { DeckMap } from "./DeckMap";
import { GenericSelect } from "./GenericSelect";
import LeftPanel from "./LeftPanel";
import airportList from "../data/us_airports.json";
import { useEffect, useState } from "react";
import { MapViewState } from "deck.gl";

export const BaseLayout = () => {
  const [selectedAirport, setSelectedAirport] = useState<string>('')
  const IDs: string[] = airportList.map(d => d.code);

  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -110,
    latitude: 37.7853,
    zoom: 3.8,
    pitch: 50,
    bearing: 0,
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-0 h-screen overflow-hidden ">
        <DeckMap
          view_state={INITIAL_VIEW_STATE}
          selectedAirport={selectedAirport}
        />
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-4 z-30 " >
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
        </div>
      </div >
    </>
  );
}
export default BaseLayout
