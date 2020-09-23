import React from 'react';
import Logo from '../../shared/components/Logo';
import './Header.css';
import NavButton from './NavMenu/NavButton/NavButton';
import NavMenu from './NavMenu/NavMenu';
import NavSeparator from './NavMenu/NavSeparator/NavSeparator';

const Header: React.FC = () => {
  return (
    <nav>
      <div className="logo-wrapper">
        <Logo size="small" width={36} height={36} />
      </div>
      <NavSeparator />
      <div className="main-nav-buttons">
        <NavButton label="Главная" navLink="/home" onClick={() => {}}></NavButton>
        <NavButton label="Водоёмы" navLink="/places" onClick={() => {}}></NavButton>
      </div>
      <NavSeparator />
      <div className="navmenu-wrapper">
        <NavMenu />
      </div>
    </nav>
  );
};

export default Header;
