import React from 'react';
import If from '../../shared/components/If';
import Logo from '../../shared/components/Logo';
import { useAppStateValue } from '../../state/AppStateProvider';
import './Header.css';
import NavMenu from './NavMenu/NavMenu';
import NavSeparator from './NavMenu/NavSeparator/NavSeparator';

const Header: React.FC = () => {
  const [{ user }] = useAppStateValue();

  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <Logo size="small" width={36} height={36} />
      </div>
      <div className="header-right-panel-wrapper">
        <If condition={!!user}>
          <div className="header-user-name">{user?.displayName}</div>
          <NavSeparator />
        </If>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
