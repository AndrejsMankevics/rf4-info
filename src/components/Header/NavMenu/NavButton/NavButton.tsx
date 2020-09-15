import * as React from 'react';
import './NavButton.css';
import { NavLink } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  navLink: string;
  onClick: (event: React.MouseEvent) => void;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  return (
    <div className="nav-button-wrapper">
      <NavLink onClick={(event) => props.onClick(event)} to={props.navLink}>
        {props.label}
      </NavLink>
    </div>
  );
};

export default NavButton;
