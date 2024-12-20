import DeckGL, { LineLayer, MapView, MapViewState, ScatterplotLayer } from 'deck.gl';
import { Map, FullscreenControl } from 'react-map-gl/maplibre';
import airportData from "../data/us_airports.json";
import { Airport } from '../types';
import { useEffect, useState } from 'react';

export const DeckMap = ({ view_state, selectedAirport }: { view_state: MapViewState, selectedAirport: string }) => {

  const [viewState, setViewState] = useState<MapViewState>({
    longitude: view_state.longitude,
    latitude: view_state.latitude,
    zoom: view_state.zoom,
    pitch: view_state.pitch,
    bearing: view_state.bearing
  });

  useEffect(() => {
    const newAirport = airportData.find((d) => d.code == selectedAirport);
    selectedAirport && setViewState({
      longitude: newAirport?.longitude ?? 0,
      latitude: newAirport?.latitude ?? 0,
      zoom: 10
    })
  }, [selectedAirport])

  const airportLayer = new ScatterplotLayer<Airport>({
    id: 'airport-layer',
    data: airportData,
    getPosition: (d: Airport) => [d.longitude, d.latitude],
    getRadius: 7200,
    getLineColor: [255, 255, 255],
    getLineWidth: 200,
    stroked: true,
    pickable: true,
    getFillColor: d => [(255 - (d.elevation * .1)), (140 + (d.elevation * .001)), (d.elevation * .50)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.3
  })

  const getTooltip = info => {
    if (!info.object) {
      return null;
    }
    return `\
    ${info.object.code} - ${info.object.icao}
    ${info.object.name}
    elev ${info.object.elevation} ft
    TZ: ${info.object.time_zone}
    ${info.object.url}`;
  };


  return (
    <DeckGL
      initialViewState={viewState}
      controller
      layers={[airportLayer]}
      getTooltip={getTooltip}
    >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="https://api.maptiler.com/maps/00553183-d09c-4722-b846-d599c71164d8/style.json?key=0suUkrpdBZITNDvdZoWU"
      >
        <FullscreenControl />
      </Map>
    </DeckGL >
  )
}
