import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header from '.'
import { AuthProvider } from '../../contexts/AuthContext';

describe('Header Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('displays a Header with 5 children', () => {
        const nav = screen.getByRole('list')

        expect(nav).toBeInTheDocument()
        expect(nav.childNodes.length).toBe(5)
    })

    it('displays a Logo', () => {
        const logo = screen.getByRole('div', { name: 'Logo' });
        expect(logo).toBeInTheDocument()
    })

    it('displays a "Home" link', () => {
        const homeLink = screen.getByText('Home')

        expect(homeLink).toBeInTheDocument()
    })
    
    it('displays a "Notes" link', () => {
        const notesLink = screen.getByText('Notes')

        expect(notesLink).toBeInTheDocument()
    })

    it('displays a "Planner" link', () => {
        const plannerLink = screen.getByText('Planner')

        expect(plannerLink).toBeInTheDocument()
    })

    it('displays a "Timer" link', () => {
        const timerLink = screen.getByText('Pomodoro Timer')

        expect(timerLink).toBeInTheDocument()
    })

    it('displays a "Login/Register" link', () => {
        const loginRegLink = screen.getByText('Login/Register')

        expect(loginRegLink).toBeInTheDocument()
    })
});