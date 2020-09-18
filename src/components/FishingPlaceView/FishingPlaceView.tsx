import React, { useState } from 'react';
import AppContext from '../../shared/contexts/AppContext';
import { conditionalClass } from '../../shared/helpers/classes.helpers';
import { FishingMapMarker, FishingPlace } from '../../shared/types';
import FishingMap from './components/FishingMap/FishingMap';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import './FishingPlaceView.css';
import PlaceHeader from './PlaceHeader';

interface FishingPlaceViewProps {
  place: FishingPlace;
  onMarkerEdit: (marker: FishingMapMarker) => void;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const { isMobile } = React.useContext(AppContext);

  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(props.place.markers[0]);

  const selectMarkerHandle = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const onMarkerEditHandle = (marker: FishingMapMarker) => {
    props.onMarkerEdit(marker);
    setSelectedMarker(marker);
  };

  return (
    <>
      <PlaceHeader
        name={props.place.name}
        links={['Точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']}
        activeLink="Точки"
      />
      <div className={conditionalClass(['place-view-wrapper'], 'mobile', isMobile)}>
        <div className="fishing-map-wrapper">
          <FishingMap place={props.place} onSelectMarker={selectMarkerHandle} />
        </div>
        <MarkerInfo marker={selectedMarker} onMarkerEdit={onMarkerEditHandle} />
      </div>
    </>
  );
};

export default FishingPlaceView;
