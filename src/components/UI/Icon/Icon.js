import React from 'react';
import './Icon.scss';

const Icon = ({ svg, size }) =>
{
  const style = { width: `${size}px`, height: `${size}px` };
  return (
    <div className="Icon" style={style}>{svg}</div>
  );
};


export default Icon;
