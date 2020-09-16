import React, { useState } from 'react';
import AppContext from '../../shared/contexts/AppContext';
import { conditionalClass } from '../../shared/helpers/classes.helpers';
import { FishingMapMarker, FishingPlace } from '../../shared/types';
import FishingMap from './components/FishingMap/FishingMap';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import PlaceHeader from './components/PlaceHeader/PlaceHeader';
import './FishingPlaceView.css';

interface FishingPlaceViewProps {
  place: FishingPlace;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const { isMobile } = React.useContext(AppContext);

  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(
    props.place.markers[0]
  );

  const selectMarker = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  return (
    <>
      <PlaceHeader
        name={props.place.name}
        links={['Точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']}
        activeLink="Точки"
      />
      <div
        className={conditionalClass(['place-view-wrapper'], 'mobile', isMobile)}
      >
        <div className="fishing-map-wrapper">
          <FishingMap place={props.place} onSelectMarker={selectMarker} />
        </div>
        <MarkerInfo marker={selectedMarker} editable={false} />
      </div>
    </>
  );
};

export default FishingPlaceView;
