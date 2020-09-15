import React from 'react';
import './Burger.css';

interface BurgerProps {
  active: boolean;
  onToggle: Function;
}

const Burger: React.FC<BurgerProps> = (props) => {
  const burgerClasses = ['burger'];
  if (props.active) {
    burgerClasses.push('active');
  }
  return (
    <div className={burgerClasses.join(' ')} onClick={() => props.onToggle()}>
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
    </div>
  );
};

export default Burger;
