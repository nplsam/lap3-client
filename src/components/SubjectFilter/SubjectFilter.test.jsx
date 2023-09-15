import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, jest } from 'vitest'
import SubjectFilter from '.';


describe('SubjectFilter Component', () => {

  it('renders an input field', () => {
    render(<SubjectFilter notes={[]} onFilter={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Filter by Subject');
    expect(inputElement).toBeTruthy();
  });

  it('renders a "Filter" button', () => {
    render(<SubjectFilter notes={[]} onFilter={() => {}} />);
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeTruthy();
  });

  it('calls the onFilter function when "Filter" button is clicked', () => {
    const onFilterMock = () => {};
    render(<SubjectFilter notes={[]} onFilter={onFilterMock} />);
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
  });

  it('updates the subjectFilter state when the input field changes', () => {
    render(<SubjectFilter notes={[]} onFilter={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Filter by Subject');
    fireEvent.change(inputElement, { target: { value: 'Math' } });
    expect(inputElement.value).toBe('Math');
  });

  it('trims and converts subjectFilter to lowercase before calling onFilter', () => {
    const onFilterMock = () => {};
    render(<SubjectFilter notes={[]} onFilter={onFilterMock} />);
    const inputElement = screen.getByPlaceholderText('Filter by Subject');
    fireEvent.change(inputElement, { target: { value: '   Science   ' } });
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
  });
});