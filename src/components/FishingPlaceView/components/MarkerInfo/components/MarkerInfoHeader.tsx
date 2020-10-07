import { IconButton, TextField, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import If from '../../../../../shared/components/If';
import { FishingMapMarker, FishingPlace } from '../../../../../shared/types/game';
import { TimeUtils } from '../../../../../shared/utils/time.utils';
import { useAppStateValue } from '../../../../../state/AppStateProvider';
import './MarkerInfoHeader.css';

interface MarkerInfoHeaderProps {
  marker: FishingMapMarker;
  place: FishingPlace;
  editableMarker: Partial<FishingMapMarker>;
  isEditable: boolean;
  onValueChange: (field: string, value: any) => void;
  onStartEdit: () => void;
  onDelete: () => void;
  onSaveChanges: () => void;
  onCancelEdit: () => void;
}

const MarkerInfoHeader: React.FC<MarkerInfoHeaderProps> = (props) => {
  const [{ user }] = useAppStateValue();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onValueChange(event.target.name, event.target.value);
  };

  const validateCoordXField = (): boolean => {
    return (
      !props.editableMarker.x ||
      !Number(props.editableMarker.x) ||
      Number(props.editableMarker.x) > props.place.width + props.place.offsetX ||
      Number(props.editableMarker.x) < props.place.offsetX
    );
  };

  const validateCoordYField = (): boolean => {
    return (
      !props.editableMarker.y ||
      !Number(props.editableMarker.y) ||
      Number(props.editableMarker.y) > props.place.height + props.place.offsetY ||
      Number(props.editableMarker.y) < props.place.offsetY
    );
  };

  const validateNameField = (): boolean => {
    return !props.editableMarker.name || String(props.editableMarker.name).length > 200;
  };

  return (
    <div className="marker-info-header-wrapper">
      <div className="marker-info-header-content">
        <If condition={!!props.marker.timestamp}>
          <div className="marker-timestamp">{`${TimeUtils.formatDateTime(new Date(props.marker.timestamp))}`}</div>
        </If>

        {props.isEditable ? (
          <>
            <form className="marker-info-form-wrapper" autoComplete="off" onSubmit={() => props.onSaveChanges()}>
              <div className="coords-wrapper">
                <TextField
                  required
                  className="coordinate"
                  name="x"
                  value={props.editableMarker.x}
                  label="X"
                  size="small"
                  variant="outlined"
                  error={validateCoordXField()}
                  onChange={handleChange}
                />
                <TextField
                  required
                  className="coordinate"
                  name="y"
                  value={props.editableMarker.y}
                  label="Y"
                  size="small"
                  variant="outlined"
                  error={validateCoordYField()}
                  onChange={handleChange}
                />
              </div>
              <TextField
                required
                className="name"
                name="name"
                fullWidth={true}
                value={props.editableMarker.name}
                label="Описание точки"
                multiline={true}
                error={validateNameField()}
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

      <If condition={!!user}>
        <div className="marker-info-header-actions">
          {props.isEditable ? (
            <>
              <Tooltip title="Сохранить">
                <IconButton
                  component="span"
                  disabled={validateCoordXField() || validateCoordYField() || validateNameField()}
                  onClick={() => props.onSaveChanges()}
                >
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
      </If>
    </div>
  );
};

export default MarkerInfoHeader;
