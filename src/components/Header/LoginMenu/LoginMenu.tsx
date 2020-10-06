import { Avatar, createStyles, Dialog, IconButton, makeStyles, Theme, withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import React, { useState } from 'react';
import { auth } from '../../../firebase';
import If from '../../../shared/components/If';
import { conditionalClass } from '../../../shared/utils/classes.utils';
import { useAppStateValue } from '../../../state/AppStateProvider';
import NavButton from '../NavMenu/NavButton/NavButton';
import LoginForm from './LoginForm/LoginForm';
import './LoginMenu.css';

const DialogContent = withStyles({
  root: {
    padding: '0 !important',
  },
})(MuiDialogContent);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarButton: {
      padding: 8,
    },
    avatar: {
      width: 36,
      height: 36,
      border: '2px solid var(--main-text-light-color)',
    },
  })
);

const LoginMenu: React.FC = () => {
  const classes = useStyles();

  const [{ user }] = useAppStateValue();

  const [activeMenu, setActiveMenu] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [registerPopupVisible, setRegisterPopupVisible] = useState(false);

  const handleLoginClick = () => {
    setActiveMenu(false);
    setLoginPopupVisible(true);
  };

  const handleRegisterClick = () => {
    setActiveMenu(false);
    setRegisterPopupVisible(true);
  };

  const handleSignOutClick = () => {
    setActiveMenu(false);
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={conditionalClass('login-menu-wrapper', 'active', activeMenu)}>
      <If condition={activeMenu}>
        <div className="login-menu-overlay" onClick={() => setActiveMenu(false)}></div>
      </If>

      <ul className={conditionalClass('login-menu-actions mobile', 'active', activeMenu)}>
        <If condition={!user}>
          <li style={{ animation: activeMenu ? `loginMenuFade 0.5s ease forwards 0.3s` : undefined }}>
            <NavButton label="Войти" navLink="" onClick={handleLoginClick}></NavButton>
          </li>
          <li style={{ animation: activeMenu ? `loginMenuFade 0.5s ease forwards 0.5s` : undefined }}>
            <NavButton label="Регистрация" navLink="" onClick={handleRegisterClick}></NavButton>
          </li>
        </If>

        <If condition={!!user}>
          <li style={{ animation: activeMenu ? `loginMenuFade 0.5s ease forwards 0.3s` : undefined }}>
            <NavButton label="Выйти" navLink="" onClick={handleSignOutClick}></NavButton>
          </li>
        </If>
      </ul>

      <IconButton className={classes.avatarButton} onClick={() => setActiveMenu(!activeMenu)}>
        <Avatar
          className={classes.avatar}
          src={user ? user.photoURL || '/assets/avatars/default_avatar.png' : undefined}
        ></Avatar>
      </IconButton>

      <Dialog open={loginPopupVisible} onClose={() => setLoginPopupVisible(false)} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <LoginForm onComplete={() => setLoginPopupVisible(false)} register={false} />
        </DialogContent>
      </Dialog>

      <Dialog open={registerPopupVisible} onClose={() => setRegisterPopupVisible(false)} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <LoginForm onComplete={() => setRegisterPopupVisible(false)} register={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginMenu;
