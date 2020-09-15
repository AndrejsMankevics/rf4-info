import React from 'react';
import Hr from '../../../../shared/components/Hr';
import { FishingMapMarker } from '../../../../shared/types';
import MarkerInfoBaits from './components/MarkerInfoBaits';
import MarkerInfoHeader from './components/MarkerInfoHeader';
import './MarkerInfo.css';

interface MarkerInfoProps {
  marker: FishingMapMarker | null;
}

const MarkerInfo: React.FC<MarkerInfoProps> = (props) => {
  if (!props.marker) {
    return <div className="map-info-wrapper" />;
  }
  return (
    <div className="map-info-wrapper">
      <MarkerInfoHeader marker={props.marker} />
      <Hr />
      <MarkerInfoBaits baits={props.marker.baits} />
      <Hr />
    </div>
  );
};

export default MarkerInfo;
