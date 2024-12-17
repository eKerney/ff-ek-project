import 'maplibre-gl/dist/maplibre-gl.css';
import { DeckMap } from './components/DeckMap';
import BaseLayout from './components/BaseLayout';
import LeftPanel from './components/LeftPanel';

function App() {
  return (
    <>
      <BaseLayout
        DeckMap={<DeckMap />}
        LeftPanel={<LeftPanel />}
        TopPanel={<></>}
      />
    </>
  );
}

export default App 
