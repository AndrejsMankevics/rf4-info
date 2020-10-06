import { Card, Grid } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FishingPlace } from '../../shared/types/game';
import { conditionalClass } from '../../shared/utils/classes.utils';
import { useAppStateValue } from '../../state/AppStateProvider';
import './PlaceSelector.css';

interface PlaceSelectorProps {
  places: FishingPlace[];
}

const PlaceSelector: React.FC<PlaceSelectorProps> = (props) => {
  const { url } = useRouteMatch();

  const [{ isMobile }] = useAppStateValue();

  return (
    <div className={conditionalClass('place-selector-wrapper', 'mobile', isMobile)}>
      <div className="title">
        <h1>Водоёмы</h1>
      </div>

      <Grid container className="grid-container" spacing={isMobile ? 2 : 5}>
        {props.places.map((place) => (
          <Grid item className="grid-item" key={place.id}>
            <Card className="place-selector-icon">
              <NavLink to={`${url}/${place.id}`}>
                <img src={place.selectorUrl} alt={place.name} width="100%" height="100%"></img>
                <span className="place-name">{place.name}</span>
              </NavLink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlaceSelector;
