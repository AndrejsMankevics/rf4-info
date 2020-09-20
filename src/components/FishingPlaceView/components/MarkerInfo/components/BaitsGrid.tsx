import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import If from '../../../../../shared/components/If';
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
  onAdd?: (bait: Bait) => void;
}

const BaitsGrid: React.FC<BaitsSelectorProps> = (props) => {
  const [{ baits }] = useAppStateValue();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

  const handleAdd = (bait: Bait) => {
    setDialogOpen(false);
    if (props.onAdd) {
      props.onAdd(bait);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
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
                <IconButton component="div" className="bait-add-button" onClick={handleOpenDialog}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">Выбор наживки</DialogTitle>
                <DialogContent dividers={true}>
                  <BaitsGrid
                    baits={baits.filter((b) => !props.baits.some((i) => i.id === b.id))}
                    selectable={true}
                    onSelect={handleAdd}
                  ></BaitsGrid>
                </DialogContent>
              </Dialog>
            </>
          </If>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BaitsGrid;
