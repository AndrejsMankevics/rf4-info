import { Button, Card, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
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
  const [{ isMobile }] = useAppStateValue();

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <If condition={!isMobile}>
        <img src="/assets/login_picture.jpg" alt="login"></img>
      </If>
      <div className={classes.loginForm}>
        <h1>Вход</h1>
        <TextField required className={classes.formField} name="email" label="Электронная почта" fullWidth={true} />
        <TextField
          required
          className={classes.formField}
          name="password"
          label="Пароль"
          fullWidth={true}
          type="password"
        />
        <Button className={classes.submitBtn} variant="outlined">
          Войти
        </Button>
      </div>
    </Card>
  );
};

export default LoginForm;
