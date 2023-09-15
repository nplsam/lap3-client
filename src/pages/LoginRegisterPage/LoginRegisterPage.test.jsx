import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LoginRegister from '.';
import { AuthProvider } from '../../contexts/AuthContext';

describe('LoginRegister component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <AuthProvider>
          <LoginRegister />
        </AuthProvider>
      </MemoryRouter> 
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display a form', () => {
    const element = screen.getByRole('form');
    expect(element).toBeInTheDocument();
  });

  it('should have tabs', () => {
    const tabs = screen.getByRole('tabs');
    expect(tabs).toBeInTheDocument();
  });
});
