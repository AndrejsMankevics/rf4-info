import { IconButton, Paper, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import If from '../../../../../shared/components/If';
import { Bait } from '../../../../../shared/types';
import { useAppStateValue } from '../../../../../state/AppStateProvider';
import './BaitInfo.css';

interface MarkerInfoBaitProps {
  bait: Bait;
  removable: boolean;
  selectable: boolean;
  onSelect?: (event: React.MouseEvent) => void;
  onRemove?: (event: React.MouseEvent) => void;
}

const MarkerInfoBait: React.FC<MarkerInfoBaitProps> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  const baitWrapperClasses = ['bait-info-wrapper'];
  if (isMobile) {
    baitWrapperClasses.push('mobile');
  }
  if (props.selectable) {
    baitWrapperClasses.push('selectable');
  }

  return (
    <Paper className="bait-info-paper">
      <div className={baitWrapperClasses.join(' ')} onClick={props.selectable ? props.onSelect : undefined}>
        <img src={props.bait.url} alt={props.bait.name} width={'100px'} height={'100px'}></img>
        <div className="bait-description">{props.bait.name}</div>
        <If condition={props.removable}>
          <div className="remove-bait-btn-wrapper">
            <Tooltip title="Удалить">
              <IconButton aria-label="clear" component="span" size="small" onClick={props.onRemove}>
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        </If>
      </div>
    </Paper>
  );
};

export default MarkerInfoBait;
