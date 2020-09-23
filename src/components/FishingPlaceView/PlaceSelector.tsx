import { Card } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './PlaceSelector.css';

interface PlaceSelectorProps {
  name: string;
  img: string;
  navLink: string;
}

const PlaceSelector: React.FC<PlaceSelectorProps> = (props) => {
  return (
    <Card className="place-selector-wrapper">
      <NavLink to={props.navLink}>
        <img src={props.img} alt={props.name} width="100%" height="100%"></img>
        <span className="place-name">{props.name}</span>
      </NavLink>
    </Card>
  );
};

export default PlaceSelector;
