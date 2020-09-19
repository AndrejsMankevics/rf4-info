import React from 'react';
import { conditionalClass } from '../../shared/helpers/classes.helpers';
import { useAppStateValue } from '../../state/AppStateProvider';
import './PlaceHeader.css';

interface PlaceHeader {
  name: string;
  links: string[];
  activeLink: string;
}

const PlaceHeader: React.FC<PlaceHeader> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  return (
    <div className={conditionalClass('place-header-wrapper', 'mobile', isMobile)}>
      <h2 className="place-header-name">{props.name}</h2>
      <div className="place-header-links-wrapper">
        {props.links.map((link, index) => {
          return (
            <div className={conditionalClass('place-header-link', 'active', link === props.activeLink)} key={index}>
              {link}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaceHeader;
