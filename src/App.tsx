import 'maplibre-gl/dist/maplibre-gl.css';
import { DeckMap } from './components/DeckMap';
import BaseLayout from './components/BaseLayout';
import LeftPanel from './components/LeftPanel';
import { AirportSelector } from './components/AirportSelector';

function App() {
  return (
    <>
      <BaseLayout
        DeckMap={<DeckMap />}
        LeftPanel={<LeftPanel />}
        TopPanel={<AirportSelector />}
      />
    </>
  );
}

export default App 
