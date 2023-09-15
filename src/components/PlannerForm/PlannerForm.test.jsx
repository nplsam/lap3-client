import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import PlannerForm from '.';
import { PlannerProvider } from '../../contexts/PlannerContext';
import { AuthProvider } from '../../contexts/AuthContext';

describe('PlannerForm component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <PlannerProvider>
            <PlannerForm />
          </PlannerProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('submits the form to add a new task', async () => {
    render(<PlannerForm actionPost={true} />);
    const dateInput = screen.getByLabelText('Enter Date:');
    const tagInput = screen.getByLabelText('Enter tag:');
    const contentInput = screen.getByLabelText('Enter task:');
    
    userEvent.type(dateInput, '2023-09-30T12:00');
    userEvent.type(tagInput, 'Test Tag');
    userEvent.type(contentInput, 'Test Task Content');
    
    const submitButton = screen.getByText('Add task');
    userEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Task created successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });
})