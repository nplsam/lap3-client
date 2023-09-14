import { describe, it, expect, beforeEach, afterEach, jest } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('displays a welcome message', () => {
    const welcomeMessage = screen.getByText('Welcome to Study Buddy!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('displays "Organize Your Notes" section', () => {
    const notesSection = screen.getByText('Organize Your Notes');
    expect(notesSection).toBeInTheDocument();
  });

  it('displays "Personalized Learning Planner" section', () => {
    const plannerSection = screen.getByText('Personalized Learning Planner');
    expect(plannerSection).toBeInTheDocument();
  });

  it('displays "Boost Productivity with Pomodoro" section', () => {
    const pomodoroSection = screen.getByText('Boost Productivity with Pomodoro');
    expect(pomodoroSection).toBeInTheDocument();
  });

  it('displays "Login to get started!" link', () => {
    const getStartedLink = screen.getByText('Login to get started!');
    expect(getStartedLink).toBeInTheDocument();
  });

  it('displays navigation buttons when logged in', () => {
    const notesButton = screen.getByText('Organize Your Notes');
    const plannerButton = screen.getByText('Personalized Learning Planner');
    const timerButton = screen.getByText('Boost Productivity with Pomodoro');
    const timerElement = screen.getByRole('timer');

    expect(notesButton).toBeInTheDocument();
    expect(plannerButton).toBeInTheDocument();
    expect(timerButton).toBeInTheDocument();
    expect(timerElement).toBeInTheDocument();
  });
});