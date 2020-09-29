import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
  },
});

const AuthPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <LoginForm />
      </Container>
    </div>
  );
};

export default AuthPage;
