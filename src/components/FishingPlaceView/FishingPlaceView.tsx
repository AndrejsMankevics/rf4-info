import React, { useState } from 'react';
import { conditionalClass } from '../../shared/helpers/classes.helpers';
import { FishingMapMarker, FishingPlace } from '../../shared/types';
import { useAppStateValue } from '../../state/AppStateProvider';
import FishingMap from './components/FishingMap/FishingMap';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import './FishingPlaceView.css';
import PlaceHeader from './PlaceHeader';

interface FishingPlaceViewProps {
  place: FishingPlace;
  onMarkerEdit: (marker: FishingMapMarker) => void;
  onMarkerDelete: (id: number) => void;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(props.place.markers[0]);

  const selectMarkerHandle = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const handleMarkerEdit = (marker: FishingMapMarker) => {
    props.onMarkerEdit(marker);
    setSelectedMarker(marker);
  };

  const handleMarkerDelete = (id: number) => {
    props.onMarkerDelete(id);
    setSelectedMarker(null);
  };

  return (
    <>
      <PlaceHeader
        name={props.place.name}
        links={['Точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']}
        activeLink="Точки"
      />
      <div className={conditionalClass('place-view-wrapper', 'mobile', isMobile)}>
        <div className="fishing-map-wrapper">
          <FishingMap place={props.place} onSelectMarker={selectMarkerHandle} />
        </div>
        <MarkerInfo
          marker={selectedMarker}
          place={props.place}
          onMarkerEdit={handleMarkerEdit}
          onMarkerDelete={handleMarkerDelete}
        />
      </div>
    </>
  );
};

export default FishingPlaceView;
