import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Register from '.';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Register component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter> 
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display a register form', () => {
    const element = screen.getByRole('register');
    expect(element).toBeInTheDocument();
  });

  it('should have input for username and password', () => {
    const username = screen.getByRole('username-input');
    const password = screen.getByRole('password-input');
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    const submitButton = screen.getByRole('submit-button');
    expect(submitButton).toBeInTheDocument();
  });
});
