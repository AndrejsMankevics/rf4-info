import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavButton.css';

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
