import { IconButton, Tooltip } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { CRS, LatLngBoundsLiteral, LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { ImageOverlay, Map, Marker, Popup, Viewport } from 'react-leaflet';
import Control from 'react-leaflet-control';
import If from '../../../../shared/components/If';
import { conditionalClass } from '../../../../shared/helpers/classes.helpers';
import { FishingMapMarker, FishingPlace } from '../../../../shared/types';
import MapCoords from './components/MapCoords';
import './FishingMap.css';
import { markerAddIcon, markerIcon } from './icons';

interface FishingMapProps {
  place: FishingPlace;
  newMarker: FishingMapMarker | null;
  onSelectMarker: (marker: FishingMapMarker | null) => void;
  onSetNewMarker: (marker: FishingMapMarker | null) => void;
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

  const toggleAddMode = () => {
    setAddModeEnabled(!addModeEnabled);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    if (addModeEnabled) {
      props.onSetNewMarker({
        baits: [],
        id: 0,
        name: '',
        x: Math.round(event.latlng.lng) + props.place.offsetX,
        y: Math.round(event.latlng.lat) + props.place.offsetY,
      });
      setAddModeEnabled(false);
    } else {
      props.onSelectMarker(null);
      props.onSetNewMarker(null);
    }
  };

  const handleSelectMarker = (marker: FishingMapMarker) => {
    setAddModeEnabled(false);
    props.onSetNewMarker(null);
    props.onSelectMarker(marker);
  };

  return (
    <>
      <If condition={addModeEnabled}>
        <span className="map-edit-overlay" onClick={toggleAddMode} />
      </If>

      <div className="map-content">
        <Map
          className={conditionalClass('', 'cursor-crosshair', addModeEnabled)}
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
          <ImageOverlay url={props.place.mapUrl} bounds={bounds} />
          {(props.newMarker ? [...props.place.markers, props.newMarker] : props.place.markers).map((marker, index) => {
            return (
              <Marker
                position={[marker.y - props.place.offsetY, marker.x - props.place.offsetX]}
                icon={marker.id === 0 ? markerAddIcon : markerIcon}
                key={index}
                onpopupopen={() => handleSelectMarker(marker)}
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
                <IconButton component="span" onClick={toggleAddMode} size="small">
                  <RoomIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Control>
        </Map>
      </div>
    </>
  );
};

export default FishingMap;
