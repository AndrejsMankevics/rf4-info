import React from 'react';
import { FishingMapMarker } from '../../../../../shared/types';
import './MarkerInfoHeader.css';

interface MarkerInfoHeaderProps {
  marker: FishingMapMarker;
}

const MarkerInfoHeader: React.FC<MarkerInfoHeaderProps> = (props) => {
  return (
    <div className="marker-info-header-wrapper">
      <div className="marker-info-header-content">
        <h1>
          {props.marker?.x}:{props.marker?.y}
        </h1>
        <h3>{props.marker.name}</h3>
      </div>
    </div>
  );
};

export default MarkerInfoHeader;
