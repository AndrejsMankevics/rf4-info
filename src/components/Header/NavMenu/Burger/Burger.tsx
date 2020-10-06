import { IconButton } from '@material-ui/core';
import React from 'react';
import { conditionalClass } from '../../../../shared/utils/classes.utils';
import './Burger.css';

interface BurgerProps {
  active: boolean;
  onToggle: Function;
}

const Burger: React.FC<BurgerProps> = (props) => {
  return (
    <div className="burger-wrapper">
      <IconButton
        size="small"
        className={conditionalClass('', 'active', props.active)}
        onClick={() => props.onToggle()}
      >
        <div className="icon-container">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </IconButton>
    </div>
  );
};

export default Burger;
