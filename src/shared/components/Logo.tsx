import React from 'react';
import './Logo.css';

interface LogoProps {
  size: 'small' | 'big';
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <img
      src={props.size === 'small' ? '/logo_s.png' : '/logo_b.png'}
      width={props.width}
      height={props.height}
      alt="logo"
    />
  );
};

export default Logo;
