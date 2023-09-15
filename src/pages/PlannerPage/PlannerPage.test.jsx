import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import PlannerPage from '.';
import { AuthProvider } from '../../contexts/AuthContext';
import { PlannerProvider } from '../../contexts/PlannerContext';

describe('PlannerPage component', () => {
    beforeEach(() => {
      render(
        <MemoryRouter> 
          <AuthProvider>
            <PlannerProvider>
              <PlannerPage />
            </PlannerProvider>
          </AuthProvider>
        </MemoryRouter> 
      );
    });
  
    afterEach(() => {
      cleanup();
    });

    it('displays the "Add new task" button', () => {
        const addButton = screen.getByText('Add new task');
        expect(addButton).toBeInTheDocument();
    });

    it('toggles the task form when "Add new task" button is clicked', () => {
        const addButton = screen.getByText('Add new task');
        userEvent.click(addButton);

        const taskForm = screen.getByTestId('addTask-form');
        expect(taskForm).toBeInTheDocument();
    });

    it('closes the task form when the close button (X) is clicked', () => {
        const addButton = screen.getByText('Add new task');
        userEvent.click(addButton);

        const closeButton = screen.getByTestId('close-button');
        userEvent.click(closeButton);

        const taskForm = screen.queryByTestId('addTask-form');
        expect(taskForm).not.toBeInTheDocument();
    });
})