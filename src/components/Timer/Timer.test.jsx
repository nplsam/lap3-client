import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi, jest } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Timer from '.';
import { TimerProvider } from '../../contexts/TimerContext';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Timer component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <AuthProvider>
          <TimerProvider>
            <Timer/>
          </TimerProvider>
        </AuthProvider>
      </MemoryRouter> 
    )
  });

  afterEach(() => {
    cleanup();
  });

  it('should display a timer', () => {
    const element = screen.getByRole('timer');
    expect(element).toBeInTheDocument();
  });

  it('should display buttons', () => {
    const element = screen.getByRole('buttons');
    expect(element).toBeInTheDocument();
  });

  it('timer should pause when the pause button is clicked', async () => {
    const pauseButton = screen.getByRole('pauseButton');
    const timerElement = screen.getByRole('timer');
    await userEvent.click(pauseButton);
    const initialTime = timerElement.textContent;
    const initialSeconds = parseInt(initialTime.split(':')[2]);
    const updatedTime = timerElement.textContent;
    const updatedSeconds = parseInt(updatedTime.split(':')[2]);
    expect(pauseButton).toBeInTheDocument();
    expect(updatedSeconds).toEqual(initialSeconds);
  });

  it('timer should reset when the reset button is clicked', async () => {
    const resetButton = screen.getByRole('resetButton');
    const timerElement = screen.getByRole('timer');
    await userEvent.click(resetButton);
    const initialTime = timerElement.textContent;
    const initialSeconds = parseInt(initialTime.split(':')[2]);
    const updatedTime = timerElement.textContent;
    const updatedSeconds = parseInt(updatedTime.split(':')[2]);
    expect(resetButton).toBeInTheDocument();
    expect(updatedSeconds).toEqual(0);
  });

  it('display 3 dropdowns', () => {
    const element = screen.getAllByRole('dropdownMenu')
    expect(element.length).toBe(3);
  });

  it('has preset button for 5 mins', () => {
    const presetButton = screen.getByRole('presetBtn5');
    const text = presetButton.textContent
    expect(presetButton).toBeInTheDocument()
    expect(text).toBe('5 mins')
  })

  it('has preset button for 10 mins', () => {
    const presetButton = screen.getByRole('presetBtn10');
    const text = presetButton.textContent
    expect(presetButton).toBeInTheDocument()
    expect(text).toBe('10 mins')
  })

  it('has preset button for 25 mins', () => {
    const presetButton = screen.getByRole('presetBtn25');
    const text = presetButton.textContent
    expect(presetButton).toBeInTheDocument()
    expect(text).toBe('25 mins')
  })
})

