import React, { useState } from 'react';
import { useAppStateValue } from '../../../state/AppStateProvider';
import Burger from './Burger/Burger';
import NavButton from './NavButton/NavButton';
import './NavMenu.css';

const NavMenu: React.FC = () => {
  const [{ isMobile }] = useAppStateValue();

  const state = {
    navLinks: [
      { id: 1, label: 'Home', navLink: '/home' },
      { id: 2, label: 'Register', navLink: '/register' },
      { id: 3, label: 'Log In', navLink: '/login' },
      { id: 4, label: 'Projects', navLink: '/home' },
    ],
  };
  const [activeBurger, setActiveBurger] = useState(false);

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
        {state.navLinks.map((link, index) => {
          return (
            <li
              style={{
                animation: activeBurger ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` : undefined,
              }}
              key={index}
            >
              <NavButton key={index} label={link.label} navLink={link.navLink} onClick={onNavLinkClick}></NavButton>
            </li>
          );
        })}
      </ul>
      {isMobile ? <Burger active={activeBurger} onToggle={toggleActive} /> : null}
    </>
  );
};

export default NavMenu;
