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
});