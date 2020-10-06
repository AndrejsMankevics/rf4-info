import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavButton.css';

interface NavButtonProps {
  label: string;
  navLink: string;
  onClick: (event: React.MouseEvent) => void;
  command?: () => void;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  return (
    <div className="nav-button-wrapper">
      {!!props.navLink ? (
        <>
          <NavLink onClick={props.onClick} to={props.navLink}>
            {props.label}
          </NavLink>
        </>
      ) : (
        <>
          <span onClick={props.onClick}>{props.label}</span>
        </>
      )}
    </div>
  );
};

export default NavButton;
