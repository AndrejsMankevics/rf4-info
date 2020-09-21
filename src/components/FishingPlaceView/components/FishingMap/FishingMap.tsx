import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CRS, LatLngBoundsLiteral, LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { ImageOverlay, Map, Marker, Popup, Viewport } from 'react-leaflet';
import Control from 'react-leaflet-control';
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
  const [addModeEnabled, setAddModeEnabled] = useState<boolean>(false);
  const bounds: LatLngBoundsLiteral = [
    [0, 0],
    [props.place.height, props.place.width],
  ];

  const whenReady = () => {
    mapRef?.current?.leafletElement.fitBounds(bounds);
  };

  const handleAddIconClick = () => {
    setAddModeEnabled(true);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    if (addModeEnabled) {
      props.onSelectMarker({
        baits: [],
        id: Math.random(), // TODO(A): allow to take id as 0 to notify that new marker was created
        name: '',
        x: Math.round(event.latlng.lng) + props.place.offsetX,
        y: Math.round(event.latlng.lat) + props.place.offsetY,
      });
      setAddModeEnabled(false);
    } else {
      props.onSelectMarker(null);
    }
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
        onclick={handleMapClick}
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
        <Control position="topright">
          <div className="custom-panel-wrapper">
            <Tooltip title="Добавить">
              <IconButton component="span" onClick={handleAddIconClick} size="small">
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        </Control>
      </Map>
    </div>
  );
};

export default FishingMap;
