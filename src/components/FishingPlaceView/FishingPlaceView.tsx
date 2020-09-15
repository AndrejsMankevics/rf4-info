import React, { useState } from 'react';
import AppContext from '../../shared/contexts/AppContext';
import { FishingMapMarker, FishingPlace } from '../../shared/types';
import FishingMap from './components/FishingMap/FishingMap';
import FishingMapInfo from './components/FishingMapInfo/FishingMapInfo';
import PlaceHeader from './components/PlaceHeader/PlaceHeader';
import './FishingPlaceView.css';

interface FishingPlaceViewProps {
  place: FishingPlace;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const { isMobile } = React.useContext(AppContext);

  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(
    null
  );

  const selectMarker = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const placeViewWrapperClasses = ['place-view-wrapper'];
  if (isMobile) {
    placeViewWrapperClasses.push('mobile');
  }

  return (
    <>
      <PlaceHeader
        name={props.place.name}
        links={['Точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']}
        activeLink="Точки"
      />
      <div className={placeViewWrapperClasses.join(' ')}>
        <div className="fishing-map-wrapper">
          <FishingMap place={props.place} onSelectMarker={selectMarker} />
        </div>
        <FishingMapInfo selectedMarker={selectedMarker} />
      </div>
    </>
  );
};

export default FishingPlaceView;
