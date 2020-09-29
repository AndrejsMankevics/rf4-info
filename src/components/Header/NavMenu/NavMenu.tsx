import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useAppStateValue } from '../../../state/AppStateProvider';
import Burger from './Burger/Burger';
import NavButton from './NavButton/NavButton';
import './NavMenu.css';

const NavMenu: React.FC = () => {
  const [{ isMobile }] = useAppStateValue();
  const [{ user }] = useAppStateValue();

  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [activeBurger, setActiveBurger] = useState(false);

  useEffect(() => {
    setNavLinks(
      user
        ? [
            { id: 1, label: 'Home', navLink: '/home' },
            { id: 2, label: 'Projects', navLink: '/home' },
            {
              id: 5,
              label: 'Logout',
              command: () => {
                if (user) {
                  auth.signOut();
                }
              },
            },
          ]
        : [
            { id: 3, label: 'Register', navLink: '/register' },
            { id: 4, label: 'Log In', navLink: '/login' },
          ]
    );
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
    </>
  );
};

export default NavMenu;
