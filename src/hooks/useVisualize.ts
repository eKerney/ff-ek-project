import { Layer } from "deck.gl";
import { RunwayGeom, FetchTypes, DeckLayers, DeckLineLayer, DeckPolyLayer } from "../types";
import { LayerTypes } from "../types/enums";

export const useVisualize = (vizType: FetchTypes, data: RunwayGeom): DeckLayers => {


  const getMapLayer = <T extends DeckLayers>(layerKind: T, data: RunwayGeom): T => {
    let layer: T = { ...layerKind };

    // const layer = new LineLayer<BartSegment>({
    //   id: 'LineLayer',
    //   data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',
    //   
    //   getColor: (d: BartSegment) => [Math.sqrt(d.inbound + d.outbound), 140, 0],
    //   getSourcePosition: (d: BartSegment) => d.from.coordinates,
    //   getTargetPosition: (d: BartSegment) => d.to.coordinates,
    //   getWidth: 12,
    //   pickable: true
    // });

    switch (layerKind.kind) {
      case LayerTypes.LineLayer:
        layer.props.data = data;
        layer. = [];

        return layer
      case LayerTypes.PolyLayer:
        return layer;
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
