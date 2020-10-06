import React, { useState } from 'react';
import If from '../../../shared/components/If';
import { conditionalClass } from '../../../shared/utils/classes.utils';
import { useAppStateValue } from '../../../state/AppStateProvider';
import Burger from './Burger/Burger';
import NavButton from './NavButton/NavButton';
import './NavMenu.css';

const NavMenu: React.FC = () => {
  const [{ isMobile }] = useAppStateValue();

  const [navLinks] = useState<any[]>([
    { id: 4, label: 'Главная', navLink: '/home', command: () => onNavLinkClick() },
    { id: 5, label: 'Водоёмы', navLink: '/places', command: () => onNavLinkClick() },
  ]);
  const [activeBurger, setActiveBurger] = useState(false);

  const toggleActive = () => {
    setActiveBurger(!activeBurger);
  };

  const onNavLinkClick = () => {
    setActiveBurger(false);
  };

  return (
    <div className={conditionalClass('navLinks-wrapper', 'active', activeBurger)}>
      <If condition={activeBurger}>
        <div className="navLinks-overlay" onClick={() => setActiveBurger(false)}></div>
      </If>

      <ul className={conditionalClass('navLinks', 'mobile', isMobile)}>
        {navLinks.map((link, index) => {
          return (
            <li
              style={{
                animation: activeBurger ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` : undefined,
              }}
              key={index}
            >
              <NavButton key={index} label={link.label} navLink={link.navLink} onClick={link.command}></NavButton>
            </li>
          );
        })}
      </ul>

      {isMobile ? <Burger active={activeBurger} onToggle={toggleActive} /> : null}
    </div>
  );
};

export default NavMenu;
