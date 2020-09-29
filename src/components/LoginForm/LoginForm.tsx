import { Button, Card, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import If from '../../shared/components/If';
import { useAppStateValue } from '../../state/AppStateProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '50px',
  },
  formField: {
    marginTop: '15px',
  },
  submitBtn: {
    marginTop: '30px',
    width: '150px',
  },
});

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [{ isMobile }] = useAppStateValue();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const handleSignIn = (event: React.MouseEvent) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/home');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Card className={classes.root}>
      <If condition={!isMobile}>
        <img src="/assets/login_picture.jpg" alt="login"></img>
      </If>
      <div className={classes.loginForm}>
        <h1>Вход</h1>
        <TextField
          required
          className={classes.formField}
          name="email"
          label="Электронная почта"
          fullWidth={true}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          required
          className={classes.formField}
          name="password"
          label="Пароль"
          fullWidth={true}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button className={classes.submitBtn} variant="outlined" onClick={handleSignIn}>
          Войти
        </Button>
      </div>
    </Card>
  );
};

export default LoginForm;
