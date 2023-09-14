import React from 'react'
import { describe, it, expect, beforeEach, afterEach} from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
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

    it('displays a Header with 5 children', () => {
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