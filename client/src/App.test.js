import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Resistor Ohm Value Calculator')).toBeInTheDocument();
  });

  it('updates dropdown value when a color is selected', () => {
    const { getAllByRole, getByDisplayValue } = render(<App />);

    // Get all the dropdowns (assuming there are 4 dropdowns based on your component)
    const dropdowns = getAllByRole('combobox');

    // Update the first dropdown
    fireEvent.change(dropdowns[0], { target: { value: 'Red' } });

    // Check if the value has been updated
    expect(getByDisplayValue('Red')).toBeInTheDocument();
  });
});
