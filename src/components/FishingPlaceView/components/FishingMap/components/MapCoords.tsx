import L, { LeafletMouseEvent } from 'leaflet';
import { LeafletContext, MapControl, withLeaflet } from 'react-leaflet';
import { FishingPlace } from '../../../../../shared/types';
import './MapCoords.css';

interface MapCoordsProps {
  leaflet: LeafletContext;
  place: FishingPlace;
}

class MapCoords extends MapControl<MapCoordsProps> {
  constructor(props: MapCoordsProps) {
    super(props);
    props.leaflet.map?.addEventListener('mousemove', (ev: LeafletMouseEvent) => {
      this.panelDiv.innerHTML = `<h2><span>${Math.round(
        ev.latlng.lng + props.place.offsetX
      )}</span>&nbsp;<span>:${Math.round(ev.latlng.lat + props.place.offsetY)}</span></h2>`;
      console.log(this.panelDiv.innerHTML);
    });
  }
  panelDiv: any;

  createLeafletElement(opts: MapCoordsProps) {
    const MapInfo = L.Control.extend({
      onAdd: () => {
        this.panelDiv = L.DomUtil.create('div', 'coords-panel-wrapper');
        return this.panelDiv;
      },
    });
    return new MapInfo({ position: 'bottomleft' });
  }

  componentDidMount() {
    const { map }: any = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(MapCoords);
