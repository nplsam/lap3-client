import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Sidebar from '.';

describe('Sidebar component', () => {
    const mockNotes = []

    beforeEach(() => {
      render(
        <MemoryRouter> 
            <Sidebar notes={mockNotes}/>
        </MemoryRouter> 
      )
    });
  
    afterEach(() => {
      cleanup();
    });
  
    it('should display a My Notes header', () => {
        const element = screen.getByText('My Notes')
        expect(element).toBeInTheDocument()
    })

    it('should render a list of notes', () => {
        const noteList = screen.getAllByRole('listitem');
        expect(noteList).toHaveLength(mockNotes.length);
    });

    it('should display a "New Note" button', () => {
        const newNoteButton = screen.getByText('+');
        expect(newNoteButton).toBeInTheDocument();
    });

    it('should render a delete button with a trash icon', () => {
        const deleteButton = screen.getByRole('button');
        const trashIcon = screen.getByRole('img');
    
        expect(deleteButton).toBeInTheDocument();
        expect(trashIcon).toBeInTheDocument();
    });

    it('should handle click events on the "New Note" button', () => {
        const newNoteButton = screen.getByText('+');
        userEvent.click(newNoteButton);
    });

    it('should handle click events on note titles', () => {
        const noteTitle = screen.getByText(mockNotes[0].title);
        userEvent.click(noteTitle);
    });

    it('should handle click events on delete buttons', () => {
        const deleteButton = screen.getAllByText('Delete')[0];
        userEvent.click(deleteButton);
    });
})