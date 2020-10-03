import { Dialog, withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useAppStateValue } from '../../../state/AppStateProvider';
import LoginForm from '../../LoginForm/LoginForm';
import Burger from './Burger/Burger';
import NavButton from './NavButton/NavButton';
import './NavMenu.css';

const DialogContent = withStyles({
  root: {
    padding: '0 !important',
  },
})(MuiDialogContent);

const NavMenu: React.FC = () => {
  const [{ isMobile }] = useAppStateValue();
  const [{ user }] = useAppStateValue();

  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [activeBurger, setActiveBurger] = useState(false);
  const [loginPopupVisible, setLogitPopupVisible] = useState(false);
  const [registerPopupVisible, setRegisterPopupVisible] = useState(false);

  useEffect(() => {
    setNavLinks([
      { id: 4, label: 'Главная', navLink: '/home' },
      { id: 5, label: 'Водоёмы', navLink: '/places' },
      ...(user
        ? [
            {
              id: 3,
              label: 'Выйти',
              command: () => {
                if (user) {
                  auth.signOut();
                }
              },
            },
          ]
        : [
            { id: 2, label: 'Войти', command: () => setLogitPopupVisible(true) },
            { id: 1, label: 'Регистрация', command: () => setRegisterPopupVisible(true) },
          ]),
    ]);
  }, [user]);

  const toggleActive = () => {
    setActiveBurger(!activeBurger);
  };

  const onNavLinkClick = (event: React.MouseEvent) => {
    if (isMobile) {
      toggleActive();
    }
  };

  const navLinksClasses = ['navLinks'];
  if (isMobile) {
    navLinksClasses.push('mobile');

    if (activeBurger) {
      navLinksClasses.push('active');
    }
  }

  return (
    <>
      <ul className={navLinksClasses.join(' ')}>
        {navLinks.map((link, index) => {
          return (
            <li
              style={{
                animation: activeBurger ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` : undefined,
              }}
              key={index}
            >
              <NavButton
                key={index}
                label={link.label}
                navLink={link.navLink}
                onClick={onNavLinkClick}
                command={link.command}
              ></NavButton>
            </li>
          );
        })}
      </ul>

      {isMobile ? <Burger active={activeBurger} onToggle={toggleActive} /> : null}

      <Dialog open={loginPopupVisible} onClose={() => setLogitPopupVisible(false)} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <LoginForm onComplete={() => setLogitPopupVisible(false)} register={false} />
        </DialogContent>
      </Dialog>

      <Dialog open={registerPopupVisible} onClose={() => setRegisterPopupVisible(false)} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <LoginForm onComplete={() => setRegisterPopupVisible(false)} register={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavMenu;
