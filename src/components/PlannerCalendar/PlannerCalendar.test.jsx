import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import PlannerCalendar from '.';
import { PlannerProvider } from '../../contexts/PlannerContext';

describe('PlannerCalendar component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PlannerProvider>
          <PlannerCalendar />
        </PlannerProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the current month and year', () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    const monthYearText = screen.getByText(`${currentMonth} ${currentYear}`);
    expect(monthYearText).toBeInTheDocument();
  });

  it('displays days of the week', () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    daysOfWeek.forEach((day) => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toBeInTheDocument();
    });
  });
})