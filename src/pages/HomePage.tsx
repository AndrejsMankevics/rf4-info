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

  const handleMarkerEdit = (marker: FishingMapMarker) => {
    if (selectedPlace) {
      const markers = selectedPlace.markers.filter((m) => m.id !== marker.id);
      setSelectedPlace({
        ...selectedPlace,
        markers: [
          ...markers,
          {
            ...marker,
            id: marker.id || (markers[markers.length - 1]?.id || 0) + 1,
          },
        ],
      });
    }
  };

  const handleMarkerDelete = (id: number) => {
    if (selectedPlace) {
      const markers = selectedPlace.markers.filter((m) => m.id !== id);
      setSelectedPlace({
        ...selectedPlace,
        markers,
      });
    }
  };

  return (
    <>
      <If condition={!!selectedPlace}>
        <FishingPlaceView
          place={selectedPlace as FishingPlace}
          onMarkerEdit={handleMarkerEdit}
          onMarkerDelete={handleMarkerDelete}
        />
      </If>
    </>
  );
};

export default HomePage;
