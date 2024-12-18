import { DeckMap } from "./DeckMap";
import { GenericSelect } from "./GenericSelect";
import LeftPanel from "./LeftPanel";
import airportList from "../data/us_airports.json";

export const BaseLayout = () => {
  const IDs = airportList.map(d => d.code);
  return (
    <>
      <div className="grid grid-cols-12 gap-0 h-screen overflow-hidden ">
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-4" >
          <LeftPanel />
        </div>
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-8" >
          <GenericSelect
            choices={IDs}
          />
          <DeckMap />
        </div>
      </div>
    </>
  );
}
export default BaseLayout
