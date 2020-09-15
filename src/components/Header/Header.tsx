import React from 'react';
import NavMenu from './NavMenu/NavMenu';
import './Header.css';
import Logo from '../../shared/components/Logo';
import NavButton from './NavMenu/NavButton/NavButton';
import NavSeparator from './NavMenu/NavSeparator/NavSeparator';

const Header: React.FC = () => {
  return (
    <nav>
      <div className="logo-wrapper">
        <Logo />
      </div>
      <NavSeparator />
      <div className="main-nav-buttons">
        <NavButton label="Home" navLink="/home" onClick={() => {}}></NavButton>
        <NavButton label="More" navLink="/more" onClick={() => {}}></NavButton>
      </div>
      <NavSeparator />
      <div className="navmenu-wrapper">
        <NavMenu />
      </div>
    </nav>
  );
};

export default Header;
