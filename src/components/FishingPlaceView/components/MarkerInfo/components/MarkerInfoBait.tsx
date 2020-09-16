import React from 'react';
import AppContext from '../../../../../shared/contexts/AppContext';
import { conditionalClass } from '../../../../../shared/helpers/classes.helpers';
import { Bait } from '../../../../../shared/types';
import './MarkerInfoBait.css';

interface MarkerInfoBaitProps {
  bait: Bait;
}

const MarkerInfoBait: React.FC<MarkerInfoBaitProps> = (props) => {
  const { isMobile } = React.useContext(AppContext);

  return (
    <div
      className={conditionalClass(
        ['marker-info-bait-wrapper'],
        'mobile',
        isMobile
      )}
    >
      <div className="bait-description">{props.bait.name}</div>
      <img
        src={props.bait.url}
        alt={props.bait.name}
        width={'100%'}
        height={'100%'}
      ></img>
    </div>
  );
};

export default MarkerInfoBait;
