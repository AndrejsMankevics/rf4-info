import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import PlaceSelector from '../components/FishingPlaceView/PlaceSelector';
import { FishingMapMarker, FishingPlace } from '../shared/types';
import { useAppStateValue } from '../state/AppStateProvider';

const PlacesPage: React.FC = () => {
  const [{ places }] = useAppStateValue();

  let { path, url } = useRouteMatch();

  const handleMarkerEdit = (place: FishingPlace, marker: FishingMapMarker) => {
    // const markers = selectedPlace.markers.filter((m) => m.id !== marker.id);
    // setSelectedPlace({
    //   ...selectedPlace,
    //   markers: [
    //     ...markers,
    //     {
    //       ...marker,
    //       id: marker.id || (markers[markers.length - 1]?.id || 0) + 1,
    //     },
    //   ],
    // });
  };

  const handleMarkerDelete = (place: FishingPlace, id: number) => {
    // const markers = selectedPlace.markers.filter((m) => m.id !== id);
    // setSelectedPlace({
    //   ...selectedPlace,
    //   markers,
    // });
  };

  if (!places || !places.length) {
    return null;
  }

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
              <FishingPlaceView
                place={place}
                onMarkerEdit={(marker) => handleMarkerEdit(place, marker)}
                onMarkerDelete={(markerId: number) => handleMarkerDelete(place, markerId)}
              />
            </Route>
          );
        })}
      </Switch>
    </>
  );
};

export default PlacesPage;
