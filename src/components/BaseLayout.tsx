export const BaseLayout = ({ DeckMap, LeftPanel, TopPanel }:
  { DeckMap: JSX.Element, LeftPanel: JSX.Element, TopPanel: JSX.Element }
) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-0 h-screen overflow-hidden ">
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-4" >01</div>
        <div className="border-2 border-dark-grey-300 bg-elevation-0 col-span-8" >
          {DeckMap}
        </div>
      </div>
    </>
  );
}
export default BaseLayout
