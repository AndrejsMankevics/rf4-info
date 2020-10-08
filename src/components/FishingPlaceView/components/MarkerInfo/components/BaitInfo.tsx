import { IconButton, Paper, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import If from '../../../../../shared/components/If';
import { Bait } from '../../../../../shared/types/game';
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
        <div
          style={{
            background: `url('/assets/baits/baits_sprites.png') 
            ${props.bait.spriteX * -100}px 
            ${props.bait.spriteY * -100}px`,
            width: 100,
            height: 100,
          }}
        />
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
