import { LineLayer, ScatterplotLayer } from "deck.gl";
import { RunwayGeom, FetchTypes, DeckLayerTypes, RunwayGeomArr, LineData, DeckLineLayer, BaseLayer } from "../types";
import { LayerTypes } from "../types/enums";

export const useVisualize = (vizType: FetchTypes, data: RunwayGeomArr, trigger: boolean, selectedAirport: string): ScatterplotLayer | LineLayer => {

  const getMapLayer = <T extends DeckLayerTypes>(layerKind: T, data: RunwayGeomArr): T => {
    let layer: T = { ...layerKind };
    switch (layer.kind) {
      case LayerTypes.LineLayer:
        try {
          layer.data = data.length > 0
            ? data.map((d: RunwayGeom) => ({ source: [d[0][0], d[0][1]], target: [d[1][0], d[1][1]] }))
            : [];
          layer.getColor = [50, 100, 150, 100];
        } catch (error) {
          console.log(error);
        }
        return layer
      default:
        throw new Error('Unsupported Layer Type')
    }
  }

  const baseLayer: BaseLayer = {
    id: 'baseLayer',
    data: [],
    pickable: true,
    autoHighlight: true,
    highlightColor: [10, 10, 10],
    opacity: 0.5,
    stroked: true,
  };

  const vizSwitchDispatch = (): LineLayer | ScatterplotLayer => {
    switch (vizType) {
      case 'MAP_RUNWAY':
        const lineLayer: DeckLineLayer = {
          ...baseLayer,
          kind: LayerTypes.LineLayer,
          id: `runway-layer-${selectedAirport}`,
          data: [],
        } as DeckLineLayer;
        const mapLayer = trigger
          ? getMapLayer<DeckLineLayer>(lineLayer, data)
          : baseLayer;
        const deckLayer = new LineLayer({
          id: mapLayer.id,
          data: mapLayer.data,
          pickable: mapLayer.pickable,
          autoHighlight: mapLayer.autoHighlight,
          highlightColor: mapLayer.highlightColor,
          opacity: mapLayer.opacity,
          stroked: mapLayer.stroked,
          getColor: mapLayer.getColor,
          getSourcePosition: ((d: LineData) => d.source),
          getTargetPosition: ((d: LineData) => d.target),
        })
        return deckLayer
      default:
        return { data: {} } as LineLayer;
    }
  };

  return trigger
    ? vizSwitchDispatch()
    : { data: {} } as LineLayer;
}
