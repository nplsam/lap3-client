import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotesPage from '.';
import { AuthProvider } from '../../contexts/AuthContext';

describe('NotesPage component', () => {
    beforeEach(() => {
      render(
        <MemoryRouter> 
          <AuthProvider>
            <NotesPage />
          </AuthProvider>
        </MemoryRouter> 
      );
    });
  
    afterEach(() => {
      cleanup();
    });
})