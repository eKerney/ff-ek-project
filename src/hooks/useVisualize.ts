import { LineLayer, ScatterplotLayer } from "deck.gl";
import { RunwayGeom, FetchTypes, DeckLayerTypes, RunwayGeomArr } from "../types";
import { LayerTypes } from "../types/enums";

export const useVisualize = (vizType: FetchTypes, data: RunwayGeomArr): ScatterplotLayer | LineLayer => {


  const getMapLayer = <T extends DeckLayerTypes>(layerKind: T, data: RunwayGeomArr): T => {
    let layer: T = { ...layerKind };

    switch (layer.kind) {
      case LayerTypes.LineLayer:
        layer.getColor = [50, 100, 150, 100];
        layer.getSourcePosition = data.map((d: RunwayGeom) => [d[0][0], d[0][1]])


        return layer
      default:
        throw new Error('Unsupported Layer Type')
    }

  }


  switch (vizType) {
    case 'MAP_RUNWAY':
      const lineLayer: DeckLineLayer = {} as DeckLineLayer;
      lineLayer.kind = LayerTypes.LineLayer;
      const deckLayer = vizType
        ? getMapLayer<DeckLineLayer>(lineLayer, data)
        : lineLayer;
      return deckLayer
    default:
      return {} as DeckLayers;
  }

}

// const airportLayer = new ScatterplotLayer<Airport>({
//   id: 'airport-layer',
//   data: airportData,
//   getPosition: (d: Airport) => [d.longitude, d.latitude],
//   getRadius: 7200,
//   getLineColor: [255, 255, 255],
//   getLineWidth: 200,
//   stroked: true,
//   pickable: true,
//   getFillColor: d => [(255 - (d.elevation * .1)), (140 + (d.elevation * .001)), (d.elevation * .50)],
//   autoHighlight: true,
//   highlightColor: [0, 255, 208],
//   opacity: 0.3
// })
