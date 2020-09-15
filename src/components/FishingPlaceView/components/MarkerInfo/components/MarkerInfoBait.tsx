import React from 'react';
import { Bait } from '../../../../../shared/types';
import './MarkerInfoBait.css';

interface MarkerInfoBaitProps {
  bait: Bait;
}

const MarkerInfoBait: React.FC<MarkerInfoBaitProps> = (props) => {
  return <div className="marker-info-bait-wrapper">{props.bait.name}</div>;
};

export default MarkerInfoBait;
