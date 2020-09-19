import React from 'react';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import If from '../shared/components/If';
import { FishingMapMarker, FishingPlace } from '../shared/types';
import { useAppStateValue } from '../state/AppStateProvider';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [{ places }] = useAppStateValue();

  const [selectedPlace, setSelectedPlace] = React.useState<FishingPlace | null>(null);

  // TODO(A): make the place selector
  React.useEffect(() => {
    setSelectedPlace(places && places[0]);
  }, [places]);

  const onMarkerEditHandle = (marker: FishingMapMarker) => {
    if (selectedPlace) {
      const markers = selectedPlace.markers.filter((m) => m.id !== marker.id);
      setSelectedPlace({
        ...selectedPlace,
        markers: [
          ...markers,
          {
            ...marker,
            id: marker.id || markers[markers.length - 1].id + 1,
          },
        ],
      });
    }
  };

  return (
    <>
      <If condition={!!selectedPlace}>
        <FishingPlaceView place={selectedPlace as FishingPlace} onMarkerEdit={onMarkerEditHandle} />
      </If>
    </>
  );
};

export default HomePage;
