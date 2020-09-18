import * as React from 'react';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import { FishingMapMarker, FishingPlace } from '../shared/types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [place, setPlace] = React.useState<FishingPlace>({
    id: 1,
    name: 'оз. Куори',
    width: 90,
    height: 90,
    offsetX: 55,
    offsetY: 55,
    markers: [
      {
        id: 1,
        name: 'Лещ. Много трофеев.',
        x: 67,
        y: 100,
        baits: [
          {
            id: 1,
            name: 'Чесночное тесто',
            url: 'assets/baits/testo_chesnochnoe.png',
          },
          {
            id: 2,
            name: 'Творожное тесто',
            url: 'assets/baits/testo_tvorozhnoe.png',
          },
        ],
      },
    ],
    url: 'assets/places/kuori.png',
  });

  const onMarkerEditHandle = (marker: FishingMapMarker) => {
    const markers = place.markers.filter((m) => m.id !== marker.id);
    setPlace({
      ...place,
      markers: [
        ...markers,
        {
          ...marker,
          id: marker.id || markers[markers.length - 1].id + 1,
        },
      ],
    });
  };

  return (
    <>
      <FishingPlaceView place={place} onMarkerEdit={onMarkerEditHandle} />
    </>
  );
};

export default HomePage;
