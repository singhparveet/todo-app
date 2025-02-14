import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders todo list", async () => {
  render(<TodoList />);
  expect(await screen.findByText("Todo List")).toBeInTheDocument();
});
