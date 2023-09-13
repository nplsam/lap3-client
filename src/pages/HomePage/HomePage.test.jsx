import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';
import { AuthProvider } from '../../contexts/AuthContext';

describe('HomePage component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter> 
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </MemoryRouter> 
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display a welcome message', () => {
    const element = screen.getByRole('welcome')
    const text = element.textContent
    expect(element).toBeInTheDocument();
    expect(text).toBe('Welcome to Study Buddy!')
  });

  it('should have description of pages', () => {
    const element = screen.getByRole('features')
    expect(element).toBeInTheDocument();
  });

  it('should diplay a get started message in one of the headins', () => {
    const headings = screen.getAllByRole('heading');
    const headingTexts = headings.map((heading) => heading.textContent);
    expect(headingTexts).toContain('Login to get started!');
  });

  it('should have buttons', () => {
    const buttonElement = screen.getByText('Organize Your Notes');
    const plannerButtonElement = screen.getByText('Personalized Learning Planner');
    const pomodoroButtonElement = screen.getByText('Boost Productivity with Pomodoro');
    expect(buttonElement).toBeInTheDocument();
    expect(plannerButtonElement).toBeInTheDocument();
    expect(pomodoroButtonElement).toBeInTheDocument();
  });
});
