import { CRS, LatLngBoundsLiteral } from 'leaflet';
import React, { useState } from 'react';
import { ImageOverlay, Map, Marker, Popup, Viewport } from 'react-leaflet';
import { FishingMapMarker, FishingPlace } from '../../../../shared/types';
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
              position={[
                marker.y - props.place.offsetY,
                marker.x - props.place.offsetX,
              ]}
              key={index}
              onpopupopen={() => props.onSelectMarker(marker)}
              onpopupclose={() => props.onSelectMarker(null)}
            >
              {/* <Tooltip permanent={true} direction={'auto'}>
                {Math.round(marker.x)}:{Math.round(marker.y)}
              </Tooltip> */}
              <Popup closeButton={false}>
                {Math.round(marker.x)}:{Math.round(marker.y)}
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default FishingMap;
