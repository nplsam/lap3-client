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

  it('should display toggle buttons', () => {
    const element = screen.getByRole('toggleBtn');
    expect(element).toBeInTheDocument();
  });
});
