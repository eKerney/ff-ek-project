import { Map, FullscreenControl } from 'react-map-gl/maplibre';
import { CircleLayer, Layer, Source } from 'react-map-gl/maplibre';

export const DeckMap = () => {

  // const airportLayer: CircleLayer = {
  //   id: 'airportLayer',
  //   data: 
  //
  // }
  //

  // GeoJSON data source
  const geojsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4194, 37.7749], // San Francisco
        },
        properties: {
          color: '#FF0000', // Red
          radius: 10
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.3321, 47.6062], // Seattle
        },
        properties: {
          color: '#00FF00', // Green
          radius: 15,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.006, 40.7128], // New York
        },
        properties: {
          color: '#0000FF', // Blue
          radius: 20,
        },
      },
    ],
  };

  // Define geothe circle layer
  const circleLayer = {
    source: geojsonData,
    id: 'circle-layer',
    type: 'circle',
    paint: {
      'circle-radius': ['get', 'radius'], // Radius from properties
      'circle-color': ['get', 'color'],  // Color from properties
      'circle-opacity': 0.8,             // Circle opacity
    },
  };

  return (
    <Map
      initialViewState={{
        longitude: -90.0,
        latitude: 37.8,
        zoom: 4
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="https://api.maptiler.com/maps/00553183-d09c-4722-b846-d599c71164d8/style.json?key=0suUkrpdBZITNDvdZoWU"
    >
      <FullscreenControl />
      <Source id="circle-data" type="geojson" data={geojsonData}>
        {/* Attach the circle layer */}
        <Layer {...circleLayer} />
      </Source>
    </Map>
  )
}
