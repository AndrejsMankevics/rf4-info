import { IconButton, TextField, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { FishingMapMarker } from '../../../../../shared/types';
import './MarkerInfoHeader.css';

interface MarkerInfoHeaderProps {
  marker: FishingMapMarker;
  editableMarker: Partial<FishingMapMarker>;
  isEditable: boolean;
  onValueChange: (field: string, value: any) => void;
  onStartEdit: () => void;
  onDelete: () => void;
  onSaveChanges: () => void;
  onCancelEdit: () => void;
}

const MarkerInfoHeader: React.FC<MarkerInfoHeaderProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onValueChange(event.target.name, event.target.value);
  };

  return (
    <div className="marker-info-header-wrapper">
      <div className="marker-info-header-content">
        {props.isEditable ? (
          <>
            <form className="marker-info-form-wrapper" autoComplete="off">
              <TextField
                className="coordinate"
                name="x"
                value={props.editableMarker.x}
                label="X"
                onChange={handleChange}
              />
              <TextField
                className="coordinate"
                name="y"
                value={props.editableMarker.y}
                label="Y"
                onChange={handleChange}
              />
              <TextField
                className="name"
                name="name"
                value={props.editableMarker.name}
                label="Название"
                onChange={handleChange}
              />
            </form>
          </>
        ) : (
          <>
            <h1>
              {props.marker?.x}:{props.marker?.y}
            </h1>
            <h3>{props.marker.name}</h3>
          </>
        )}
      </div>
      <div className="marker-info-header-actions">
        {props.isEditable ? (
          <>
            <Tooltip title="Сохранить">
              <IconButton component="span" onClick={() => props.onSaveChanges()}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Отмена">
              <IconButton component="span" onClick={() => props.onCancelEdit()}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Изменить">
              <IconButton component="span" onClick={() => props.onStartEdit()}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton component="span" onClick={() => props.onDelete()}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default MarkerInfoHeader;
