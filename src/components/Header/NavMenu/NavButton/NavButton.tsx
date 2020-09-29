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
  const handleSpanClick = (event: React.MouseEvent) => {
    props.onClick(event);
    props.command && props.command();
  };

  return (
    <div className="nav-button-wrapper">
      {!!props.navLink ? (
        <>
          <NavLink onClick={(event) => props.onClick(event)} to={props.navLink}>
            {props.label}
          </NavLink>
        </>
      ) : (
        <>
          <span onClick={handleSpanClick}>{props.label}</span>
        </>
      )}
    </div>
  );
};

export default NavButton;
