import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Timer from '.';
import { TimerProvider } from '../../contexts/TimerContext';

describe('Timer component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <TimerProvider>
          <Timer />
        </TimerProvider>
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

  it('should display 3 buttons', () => {
    const buttons = screen.getAllByRole('button');
    const expectedButtonCount = 3;
    expect(buttons.length).toBe(expectedButtonCount);
  });

  it('timer should reduce when the start button is clicked', async () => {
    const startButton = screen.getByRole('startButton');
    const timerElement = screen.getByRole('timer');
    await userEvent.click(startButton);
    const initialTime = timerElement.textContent;
    const initialSeconds = parseInt(initialTime.split(':')[2]);
    await waitFor(() => {
      const updatedTime = timerElement.textContent;
      const updatedSeconds = parseInt(updatedTime.split(':')[2]);
      expect(startButton).toBeInTheDocument()
      expect(updatedSeconds).toBeLessThan(initialSeconds);
    });
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

  it('display 3 dropdowns', async () => {
    const element = screen.getAllByRole('dropdownMenu')
    expect(element.length).toBe(3);
  });

  it('preset timer when preset button is clicked', async () => {
    const presetButton = screen.getByRole('presetBtn5');
    const timerElement = screen.getByRole('timer');
    await userEvent.click(presetButton);
    const time = timerElement.textContent;
    const seconds = parseInt(time.split(':')[2]);
    expect(presetButton).toBeInTheDocument();
    expect(seconds).toEqual(300);
  })
})
