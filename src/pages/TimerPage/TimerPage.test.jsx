import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import TimerPage from '.';
import { TimerProvider } from '../../contexts/TimerContext';
import { AuthProvider } from '../../contexts/AuthContext';

describe('TimerPage component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <AuthProvider>
          <TimerProvider>
            <TimerPage/>
          </TimerProvider>
        </AuthProvider>
      </MemoryRouter> 
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display a heading', () => {
    const element = screen.getByRole('heading')
    const text = element.textContent
    expect(element).toBeInTheDocument();
    expect(text).toBe('Pomodoro Timer')
  });
});
