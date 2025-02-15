import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TodoList from './TodoList';
import userEvent from '@testing-library/user-event';

// Mock API
const mock = new MockAdapter(axios);

describe('TodoList Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    it('renders fetched todos', async () => {
        // Mock GET request
        mock.onGet('http://localhost:8080/api/todos').reply(200, [
            { id: 1, title: 'Test Todo', completed: false }
        ]);

        render(<TodoList />);

        // Wait for API call to resolve
        await waitFor(() => expect(screen.getByText('Test Todo')).toBeInTheDocument());
    });

    it('adds a new todo', async () => {
        mock.onGet('http://localhost:8080/api/todos').reply(200, []);
        mock.onPost('http://localhost:8080/api/todos').reply(200, {
            id: 2,
            title: 'New Todo',
            completed: false
        });

        render(<TodoList />);

        // Type new todo
        const input = screen.getByLabelText(/New Todo/i);
        await userEvent.type(input, 'New Todo');

        // Click add button
        const addButton = screen.getByRole('button', { name: /add/i });
        await userEvent.click(addButton);

        // Check if new todo appears
        await waitFor(() => expect(screen.getAllByText('New Todo')[0]).toBeInTheDocument());
    });
});
