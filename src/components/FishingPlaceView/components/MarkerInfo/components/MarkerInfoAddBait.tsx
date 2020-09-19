import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { Bait } from '../../../../../shared/types';
import BaitsSelector from './BaitsSelector';
import './MarkerInfoAddBait.css';

interface MarkerInfoAddBaitProps {
  baits: Bait[];
  onAdd: (bait: Bait) => void;
}

const MarkerInfoAddBait: React.FC<MarkerInfoAddBaitProps> = (props) => {
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setSelectorOpen(true);
  };

  const handleClose = () => {
    setSelectorOpen(false);
  };

  const handleSelect = (bait: Bait) => {
    props.onAdd(bait);
    setSelectorOpen(false);
  };

  return (
    <div className="add-bait-wrapper">
      <Grid container justify="center">
        <Grid item style={{ alignSelf: 'center' }}>
          <Tooltip title="Добавить">
            <IconButton component="span" onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={selectorOpen}
            onClose={handleClose}
            maxWidth="lg"
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Выбор наживки</DialogTitle>
            <DialogContent dividers={true}>
              <BaitsSelector baits={props.baits} onSelect={handleSelect} />
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default MarkerInfoAddBait;
