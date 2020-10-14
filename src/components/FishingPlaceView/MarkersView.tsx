import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { FishingMapMarker, FishingPlace } from '../../shared/types/game';
import { conditionalClass } from '../../shared/utils/classes.utils';
import { useAppStateValue } from '../../state/AppStateProvider';
import FishingMap from './components/FishingMap/FishingMap';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import './MarkersView.css';

interface MarkersViewProps {
  place: FishingPlace;
  viewType: 'public' | 'private' | 'view';
  viewMarkerId?: string;
}

const MarkersView: React.FC<MarkersViewProps> = (props) => {
  const [{ isMobile, user }] = useAppStateValue();

  const [markers, setMarkers] = useState<FishingMapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<FishingMapMarker | null>(null);
  const [newMarker, setNewMarker] = useState<FishingMapMarker | null>(null);

  useEffect(() => {
    const markersRef = db.collection('markers');

    let unsubscribe: (() => void) | null = null;

    if (props.viewType === 'public') {
      unsubscribe = markersRef
        .where('placeId', '==', props.place.id)
        .where('owner', '==', 'public')
        .onSnapshot((snapshot) => {
          setMarkers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FishingMapMarker[]);
        });
    } else if (props.viewType === 'private' && !!user) {
      unsubscribe = markersRef
        .where('placeId', '==', props.place.id)
        .where('owner', '==', user.id)
        .onSnapshot((snapshot) => {
          setMarkers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FishingMapMarker[]);
        });
    } else if (props.viewType === 'view' && !!props.viewMarkerId) {
      markersRef
        .doc(props.viewMarkerId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() as FishingMapMarker;
            if (data.placeId === props.place.id) {
              const m = { ...data, id: doc.id } as FishingMapMarker;
              setMarkers([m]);
              setSelectedMarker(m);
            }
          }
        });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [props, user]);

  const selectMarkerHandle = (marker: FishingMapMarker | null) => {
    setSelectedMarker(marker);
  };

  const handleMarkerEdit = (marker: FishingMapMarker) => {
    if (!marker.id) {
      // reset markers selections since we have just created a new one
      setNewMarker(null);
      setSelectedMarker(null);
      const owner = props.viewType === 'public' ? 'public' : user?.id || 'none';
      const { id, ...rest } = { ...marker, owner };
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
    <div className={conditionalClass('place-view-wrapper', 'mobile', isMobile)}>
      <div className="fishing-map-wrapper">
        <FishingMap
          readonly={props.viewType === 'view'}
          place={props.place}
          markers={markers}
          onSelectMarker={selectMarkerHandle}
          newMarker={newMarker}
          onSetNewMarker={handleSetNewMarker}
        />
      </div>
      <MarkerInfo
        readonly={props.viewType === 'view'}
        marker={selectedMarker}
        place={props.place}
        onMarkerEdit={handleMarkerEdit}
        onMarkerDelete={handleMarkerDelete}
      />
    </div>
  );
};

export default MarkersView;
