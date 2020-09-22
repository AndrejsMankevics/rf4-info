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
  const [newMarker, setNewMarker] = useState<FishingMapMarker | null>(null);

  const selectMarkerHandle = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const handleMarkerEdit = (marker: FishingMapMarker) => {
    if (marker.id === 0) {
      // reset markers selections since we have just created a new one
      setNewMarker(null);
      setSelectedMarker(null);
    } else {
      setSelectedMarker(marker);
    }
    props.onMarkerEdit(marker);
  };

  const handleMarkerDelete = (id: number) => {
    props.onMarkerDelete(id);
    setNewMarker(null);
    setSelectedMarker(null);
  };

  const handleSetNewMarker = (marker: FishingMapMarker | null) => {
    setNewMarker(marker);
    setSelectedMarker(marker);
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
          <FishingMap
            place={props.place}
            onSelectMarker={selectMarkerHandle}
            newMarker={newMarker}
            onSetNewMarker={handleSetNewMarker}
          />
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
