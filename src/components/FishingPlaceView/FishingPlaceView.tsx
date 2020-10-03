import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { conditionalClass } from '../../shared/helpers/classes.helpers';
import { FishingMapMarker, FishingPlace } from '../../shared/types/game';
import { useAppStateValue } from '../../state/AppStateProvider';
import FishingMap from './components/FishingMap/FishingMap';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import './FishingPlaceView.css';
import PlaceHeader from './PlaceHeader';

interface FishingPlaceViewProps {
  place: FishingPlace;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  const [markers, setMarkers] = useState<FishingMapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(null);
  const [newMarker, setNewMarker] = useState<FishingMapMarker | null>(null);

  useEffect(() => {
    db.collection('markers')
      .where('placeId', '==', props.place.id)
      .onSnapshot((snapshot) => {
        setMarkers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FishingMapMarker[]);
      });
  }, [props.place]);

  const selectMarkerHandle = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const handleMarkerEdit = (marker: FishingMapMarker) => {
    if (!marker.id) {
      // reset markers selections since we have just created a new one
      setNewMarker(null);
      setSelectedMarker(null);
      const { id, ...rest } = marker;
      db.collection('markers').add(rest);
    } else {
      setSelectedMarker(marker);
      db.collection('markers').doc(marker.id).set(marker);
    }
  };

  const handleMarkerDelete = (id: string) => {
    if (!!id) {
      db.collection('markers').doc(id).delete();
    }
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
            markers={markers}
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
