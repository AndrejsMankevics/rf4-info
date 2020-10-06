import React from 'react';
import Logo from '../../shared/components/Logo';
import { conditionalClass } from '../../shared/utils/classes.utils';
import { useAppStateValue } from '../../state/AppStateProvider';
import './Header.css';
import LoginMenu from './LoginMenu/LoginMenu';
import NavMenu from './NavMenu/NavMenu';

const Header: React.FC = () => {
  const [{ isMobile }] = useAppStateValue();

  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <Logo size="small" width={36} height={36} />
      </div>
      <div className={conditionalClass('header-right-panel-wrapper', 'mobile', isMobile)}>
        <NavMenu />
        <LoginMenu />
      </div>
    </div>
  );
};

export default Header;
