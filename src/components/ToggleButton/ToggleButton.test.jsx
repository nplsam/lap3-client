import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimerProvider } from '../../contexts/TimerContext';


import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import ToggleButton from '.';

describe('ToggleButton component', () => {

    beforeEach(() => {
      render(
        <TimerProvider> 
            <ToggleButton />
        </TimerProvider> 
      )
    });
  
    afterEach(() => {
      cleanup();
    });

    it('renders without errors', () => {
    })

    it('displays the label text correctly', () => {
        const labelText = screen.getByText('Rest');
        expect(labelText).toBeInTheDocument();
    })

    it('changes label text after clicking', () => {
        const labelText = screen.getByText('Rest');
        expect(labelText).toBeInTheDocument();
    
        fireEvent.click(screen.getByRole('checkbox'));

        const updatedLabelText = screen.getByText('Work');
        expect(updatedLabelText).toBeInTheDocument();
    })

    it('renders an unchecked checkbox when isOn is false', () => {
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
      });
    
    it('renders a checked checkbox when isOn is true', () => {
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    })
})
