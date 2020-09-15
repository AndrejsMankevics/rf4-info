import React from 'react';
import { FishingMapMarker } from '../../../../shared/types';
import './FishingMapInfo.css';

interface FishingMapInfoProps {
  selectedMarker: FishingMapMarker | null;
}

const FishingMapInfo: React.FC<FishingMapInfoProps> = (props) => {
  return <div className="map-info-wrapper">{props.selectedMarker?.name}</div>;
};

export default FishingMapInfo;
