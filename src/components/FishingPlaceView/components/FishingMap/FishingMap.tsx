import { CRS, LatLngBoundsLiteral } from 'leaflet';
import React, { useState } from 'react';
import { ImageOverlay, LayersControl, Map, Marker, Popup, Viewport } from 'react-leaflet';
import { FishingMapMarker, FishingPlace } from '../../../../shared/types';
import MapCoords from './components/MapCoords';
import './FishingMap.css';

interface FishingMapProps {
  place: FishingPlace;
  onSelectMarker: (marker: FishingMapMarker | null) => void;
}

const FishingMap: React.FC<FishingMapProps> = (props) => {
  const mapRef = React.createRef<Map>();

  const [viewport] = useState({
    center: [props.place.height / 2, props.place.width / 2],
    zoom: 1,
  } as Viewport);

  const bounds: LatLngBoundsLiteral = [
    [0, 0],
    [props.place.height, props.place.width],
  ];

  const whenReady = () => {
    mapRef?.current?.leafletElement.fitBounds(bounds);
  };

  return (
    <div className="map-content">
      <Map
        viewport={viewport}
        crs={CRS.Simple}
        ref={mapRef}
        maxBounds={bounds}
        zoomSnap={0.1}
        minZoom={2}
        maxZoom={4}
        doubleClickZoom={false}
        onclick={(event) => props.onSelectMarker(null)}
        scrollWheelZoom={false}
        whenReady={() => whenReady()}
      >
        <ImageOverlay url={props.place.url} bounds={bounds} />
        {props.place.markers.map((marker, index) => {
          return (
            <Marker
              position={[marker.y - props.place.offsetY, marker.x - props.place.offsetX]}
              key={index}
              onpopupopen={() => props.onSelectMarker(marker)}
              onpopupclose={() => props.onSelectMarker(null)}
            >
              <Popup closeButton={false}>
                {Math.round(marker.x)}:{Math.round(marker.y)}
              </Popup>
            </Marker>
          );
        })}

        <MapCoords place={props.place} />

        <LayersControl position="topright">
          <LayersControl.Overlay name="Feature group">
            {/* <FeatureGroup color="purple">
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup> */}
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    </div>
  );
};

export default FishingMap;
