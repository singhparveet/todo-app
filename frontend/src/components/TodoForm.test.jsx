import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm Component", () => {
    let mockAxios;
    let mockOnTodoAdded;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        mockOnTodoAdded = vi.fn();
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it("renders input field and add button", () => {
        render(<TodoForm onTodoAdded={mockOnTodoAdded} />);

        expect(screen.getByLabelText("New Todo")).toBeInTheDocument();
        expect(screen.getByText("Add")).toBeInTheDocument();
    });

    it("does not call API if input is empty", async () => {
        render(<TodoForm onTodoAdded={mockOnTodoAdded} />);

        const addButton = screen.getByText("Add");
        fireEvent.click(addButton);

        // Ensure Axios was NOT called
        expect(mockAxios.history.post.length).toBe(0);
        expect(mockOnTodoAdded).not.toHaveBeenCalled();
    });

    it("calls API and clears input on successful todo submission", async () => {
        mockAxios.onPost("http://localhost:8080/api/todos").reply(201, {
            id: 1,
            title: "New Todo",
            completed: false
        });

        render(<TodoForm onTodoAdded={mockOnTodoAdded} />);

        const input = screen.getByLabelText("New Todo");
        const addButton = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "New Todo" } });
        fireEvent.click(addButton);

        await waitFor(() => expect(mockAxios.history.post.length).toBe(1));

        // Check that input field is cleared
        expect(input.value).toBe("");

        // Check that `onTodoAdded` was called with new todo
        expect(mockOnTodoAdded).toHaveBeenCalledWith({
            id: 1,
            title: "New Todo",
            completed: false
        });
    });
});
