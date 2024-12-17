import { Map, FullscreenControl } from 'react-map-gl/maplibre';

export const DeckMap = () => {
  return (
    <Map
      initialViewState={{
        longitude: -100.4,
        latitude: 37.8,
        zoom: 4
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="https://api.maptiler.com/maps/00553183-d09c-4722-b846-d599c71164d8/style.json?key=0suUkrpdBZITNDvdZoWU"
    >
      <FullscreenControl />
    </Map>
  )
}
