import React from 'react';
import { Bait } from '../../../../../shared/types';
import MarkerInfoBait from './MarkerInfoBait';
import './MarkerInfoBaits.css';

interface MarkerInfoBaitsProps {
  baits: Bait[];
}

const MarkerInfoBaits: React.FC<MarkerInfoBaitsProps> = (props) => {
  return (
    <div className="marker-info-baits-wrapper">
      <h2 className="group-header">Наживки</h2>
      <div className="baits-container">
        {props.baits.map((bait) => {
          return <MarkerInfoBait bait={bait} key={bait.id} />;
        })}
      </div>
    </div>
  );
};

export default MarkerInfoBaits;
