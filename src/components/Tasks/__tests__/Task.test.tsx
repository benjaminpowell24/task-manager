import '@testing-library/jest-dom'
import { Task } from "../Task";
import {render, screen} from "@testing-library/react";

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    setTasks: jest.fn()
  })
}));


describe("Task test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task with name, description, and priority", () => {
    render(<Task id={1} name="Test Task" description="This is a test task" priority="high" />);
    const taskElement = screen.getByRole("listitem");
    expect(taskElement).toBeInTheDocument();
  });

  it('should have an edit task button', () => {
    render(<Task id={1} name="Test Task" description="This is a test task" priority="high" />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it('should have a delete task button', () => {
    render(<Task id={1} name="Test Task" description="This is a test task" priority="high" />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
