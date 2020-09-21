import React, { useEffect, useState } from 'react';
import Hr from '../../../../shared/components/Hr';
import { FishingMapMarker, FishingPlace } from '../../../../shared/types';
import MarkerInfoBaits from './components/MarkerInfoBaits';
import MarkerInfoHeader from './components/MarkerInfoHeader';
import './MarkerInfo.css';

interface MarkerInfoProps {
  marker: FishingMapMarker | null;
  place: FishingPlace;
  onMarkerEdit: (marker: FishingMapMarker) => void;
}

const MarkerInfo: React.FC<MarkerInfoProps> = (props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editableMarker, setEditableMarker] = useState<Partial<FishingMapMarker>>(props.marker || {});

  useEffect(() => {
    setIsEditable(false);
  }, [props.marker]);

  const onStartEditHandle = () => {
    setEditableMarker(props.marker || {});
    setIsEditable(true);
  };

  const onDeleteHandle = () => {};

  const onSaveChangesHandle = () => {
    if (!!editableMarker.id && editableMarker.baits && editableMarker.name && editableMarker.x && editableMarker.y) {
      setIsEditable(false);
      props.onMarkerEdit(editableMarker as FishingMapMarker);
    }
  };

  const onCancelEditHandle = () => {
    setIsEditable(false);
  };

  const onValueChangeHandle = (field: string, value: any) => {
    setEditableMarker({
      ...editableMarker,
      [field]: value,
    });
    console.log(editableMarker);
  };

  if (!props.marker) {
    return <div className="map-info-wrapper" />;
  }
  return (
    <div className="map-info-wrapper">
      <MarkerInfoHeader
        marker={props.marker}
        place={props.place}
        editableMarker={editableMarker}
        isEditable={isEditable}
        onValueChange={onValueChangeHandle}
        onStartEdit={onStartEditHandle}
        onDelete={onDeleteHandle}
        onSaveChanges={onSaveChangesHandle}
        onCancelEdit={onCancelEditHandle}
      />
      <MarkerInfoBaits
        baits={isEditable ? editableMarker.baits || [] : props.marker.baits}
        isEditable={isEditable}
        onChange={(baits) => onValueChangeHandle('baits', baits)}
      />
      <Hr />
    </div>
  );
};

export default MarkerInfo;
