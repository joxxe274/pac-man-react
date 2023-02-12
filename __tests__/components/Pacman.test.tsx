import React from 'react';
import { render } from '@testing-library/react';
import { PacMan } from '../../src/components/pac-man/PacMan.component';

describe('PacMan', () => {
  it('renders the PacMan svg', () => {
    const { getByTestId } = render(<PacMan />);
    const pacman = getByTestId('pac-man');
    expect(pacman).toBeInTheDocument();
    expect(pacman).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('moves the PacMan svg', () => {
    const { rerender, getByTestId } = render(<PacMan x={0} y={0} speed={0}  />);
    const pacman = getByTestId('pac-man');
    expect(pacman).toHaveStyle('top: 0px');
    expect(pacman).toHaveStyle('left: 0px');
    rerender(<PacMan x={15} y={15} speed={0} />)
    expect(pacman).toHaveStyle('top: 15px');
    expect(pacman).toHaveStyle('left: 15px');
  })
});