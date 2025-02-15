import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import userEvent from '@testing-library/user-event';


// Mock API
const mock = new MockAdapter(axios);

// Group tests using describe
describe('App Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    it('renders the TodoList component', async () => {
        mock.onGet('http://localhost:8080/api/todos').reply(200, []);
        mock.onPost('http://localhost:8080/api/todos').reply(200, {
            id: 2,
            title: 'New Todo',
            completed: false
        });

        render(<App />);

        // Type new todo
        const input = screen.getByLabelText(/New Todo/i);
        await userEvent.type(input, 'New Todo');

        // Click add button
        const addButton = screen.getByRole('button', { name: /add/i });
        await userEvent.click(addButton);

        // Check if new todo appears
        await waitFor(() => expect(screen.getAllByText('New Todo')[0]).toBeInTheDocument());
        
        // Check if the TodoList component renders something meaningful
        // Assuming TodoList contains a heading like "My Todos"
        // expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
});
