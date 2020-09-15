import React from 'react';
import { FishingMapMarker } from '../../../../../shared/types';
import './MarkerInfoHeader.css';

interface MarkerInfoHeaderProps {
  marker: FishingMapMarker;
}

const MarkerInfoHeader: React.FC<MarkerInfoHeaderProps> = (props) => {
  return (
    <div className="marker-info-header-wrapper">
      <h1 className="marker-info-header-name">{props.marker.name}</h1>
      <div className="marker-info-header-coords">
        {props.marker?.x}:{props.marker?.y}
      </div>
    </div>
  );
};

export default MarkerInfoHeader;
