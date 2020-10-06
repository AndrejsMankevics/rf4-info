import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import PlaceSelector from '../components/FishingPlaceView/PlaceSelector';
import { useAppStateValue } from '../state/AppStateProvider';

const PlacesPage: React.FC = () => {
  const [{ places }] = useAppStateValue();

  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <PlaceSelector places={places} />
        </Route>
        {places.map((place) => {
          return (
            <Route path={`${path}/${place.id}`} key={place.id}>
              <FishingPlaceView place={place} />
            </Route>
          );
        })}
      </Switch>
    </>
  );
};

export default PlacesPage;
