import React from 'react';

import styles from '~/styles/pacman.module.scss'


export const PacMan: React.FC = () => {
  return (
    <svg className={styles.pacman} viewBox="0 0 100 100" data-testid="pac-man">
      <circle cx="50%" cy="50%" r="25%"></circle>
    </svg>
  )
};