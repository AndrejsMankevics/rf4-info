import React from 'react';
import './PlaceHeader.css';

interface PlaceHeader {
  name: string;
  links: string[];
  activeLink: string;
}

const PlaceHeader: React.FC<PlaceHeader> = (props) => {
  return (
    <div className="place-header-wrapper">
      <h2 className="place-header-name">{props.name}</h2>
      <div className="place-header-links-wrapper">
        {props.links.map((link, index) => {
          const classes: string[] = ['place-header-link'];
          if (link === props.activeLink) {
            classes.push('active');
          }
          return (
            <div className={classes.join(' ')} key={index}>
              {link}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaceHeader;
