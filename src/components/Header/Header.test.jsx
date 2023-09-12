import React from 'react'
import { describe, it, expect, beforeEach, afterEach, jest } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'; // with this we can specify fake history to allow us to test things

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header from '.'

describe('Header Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('display a Header with 4 children', () => {
        const nav = screen.getByRole('list')

        expect(nav).toBeInTheDocument()
        expect(nav.childNodes.length).toBe(4)
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
        const timerLink = screen.getByText('Timer')

        expect(timerLink).toBeInTheDocument()
    })
});