import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import PlaceSelector from '../components/FishingPlaceView/PlaceSelector';
import { useAppStateValue } from '../state/AppStateProvider';

const PlacesPage: React.FC = () => {
  const [{ places }] = useAppStateValue();

  let { path, url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          {places.map((place) => {
            return (
              <PlaceSelector img={place.selectorUrl} name={place.name} navLink={`${url}/${place.id}`} key={place.id} />
            );
          })}
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
