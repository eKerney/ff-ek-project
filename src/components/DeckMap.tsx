import DeckGL, { LineLayer, MapView, MapViewState, ScatterplotLayer } from 'deck.gl';
import { Map, FullscreenControl } from 'react-map-gl/maplibre';
import airportData from "../data/us_airports.json";
import { Airport } from '../types';

export const DeckMap = () => {
  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 4
  };

  const airportLayer = new ScatterplotLayer<Airport>({
    id: 'airport-layer',
    data: airportData,
    getPosition: (d: Airport) => [d.latitude, d.longitude],
    getRadius: d => 200,
    getFillColor: [255, 140, 0],
    pickable: true
  })

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[airportLayer]} >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="https://api.maptiler.com/maps/00553183-d09c-4722-b846-d599c71164d8/style.json?key=0suUkrpdBZITNDvdZoWU"
      />
    </DeckGL >
  )
}
