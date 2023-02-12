import React from 'react';

import styles from '~/styles/pacman.module.scss'


interface Props {
  x?: number;
  y?: number;
  speed?: number;
}
export const PacMan: React.FC<Props> = (
  {
    x = 0,
    y = 0,
    speed = 1
  }
) => {
  return (
    <svg 
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transition: `all ${speed}ms linear`
      }}
      className={styles.pacman} 
      viewBox="0 0 100 100" 
      data-testid="pac-man">
      <circle cx="50%" cy="50%" r="25%"></circle>
    </svg>
  )
};