import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { Bait } from '../../../../../shared/types';
import MarkerInfoBait from './MarkerInfoBait';

interface BaitsSelectorProps {
  baits: Bait[];
  onSelect: (bait: Bait) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      width: 100,
    },
  })
);

const BaitsSelector: React.FC<BaitsSelectorProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {props.baits.map((bait) => (
            <Grid item key={bait.id}>
              <Paper className={classes.paper}>
                <MarkerInfoBait
                  type="select"
                  bait={bait}
                  removable={false}
                  onClick={() => props.onSelect(bait)}
                ></MarkerInfoBait>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BaitsSelector;
