import { makeStyles } from '@material-ui/core';
import React from 'react';
import Logo from '../shared/components/Logo';
import './HomePage.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo size="big" />
    </div>
  );
};

export default HomePage;
