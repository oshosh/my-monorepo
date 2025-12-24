import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders', () => {
    render(<Avatar>N</Avatar>);
    expect(screen.getByText('N')).toBeInTheDocument();
  });
});
