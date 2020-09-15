import * as React from 'react';
import FishingPlaceView from '../components/FishingPlaceView/FishingPlaceView';
import { FishingPlace } from '../shared/types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [place] = React.useState({
    id: 1,
    name: 'Старый Острог',
    width: 80,
    height: 80,
    markers: [
      {
        id: 1,
        name: 'Лещ',
        x: 10,
        y: 44,
        baits: [
          { id: 1, name: 'Чесночное тесто', url: '' },
          { id: 2, name: 'Творожное тесто', url: '' },
        ],
      },
    ],
    url:
      'https://rf4game.ru/forum/uploads/monthly_2017_08/Ostrog-Karta.jpg.ea890f64cb925307f592162f996775a4.jpg',
  } as FishingPlace);

  return (
    <>
      <FishingPlaceView place={place} />
    </>
  );
};

export default HomePage;
