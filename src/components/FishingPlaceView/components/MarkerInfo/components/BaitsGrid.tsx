import { Grid, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import If from '../../../../../shared/components/If';
import { conditionalClass } from '../../../../../shared/helpers/classes.helpers';
import { Bait } from '../../../../../shared/types';
import { useAppStateValue } from '../../../../../state/AppStateProvider';
import BaitInfo from './BaitInfo';
import './BaitsGrid.css';

interface BaitsSelectorProps {
  baits: Bait[];
  removable?: boolean;
  selectable?: boolean;
  addOption?: boolean;
  onSelect?: (bait: Bait) => void;
  onRemove?: (bait: Bait) => void;
  onAddClick?: (event: React.MouseEvent) => void;
}

const BaitsGrid: React.FC<BaitsSelectorProps> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  const handleSelect = (bait: Bait) => {
    if (props.onSelect) {
      props.onSelect(bait);
    }
  };

  const handleRemove = (bait: Bait) => {
    if (props.onRemove) {
      props.onRemove(bait);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={isMobile ? 1 : 2}>
          {props.baits.map((bait) => (
            <Grid item key={bait.id}>
              <BaitInfo
                bait={bait}
                removable={!!props.removable}
                selectable={!!props.selectable}
                onSelect={() => handleSelect(bait)}
                onRemove={() => handleRemove(bait)}
              ></BaitInfo>
            </Grid>
          ))}

          <If condition={!!props.addOption}>
            <>
              <Tooltip title="Добавить">
                <IconButton
                  component="div"
                  className={conditionalClass('bait-add-button', 'mobile', isMobile)}
                  onClick={props.onAddClick}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
          </If>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BaitsGrid;
