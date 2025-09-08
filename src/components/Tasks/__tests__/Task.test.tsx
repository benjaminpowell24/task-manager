import '@testing-library/jest-dom'
import { Task } from "../Task";
import {render, screen} from "@testing-library/react";

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    setTasks: jest.fn()
  })
}));


describe("Task", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task", () => {
    render(<Task id={1} name="Test Task" description="This is a test task" priority="high" />);
    const taskElement = screen.getByRole("listitem");
    expect(taskElement).toBeInTheDocument();
  });

  it.todo('should edit a task');

  it.todo('should delete a task');
});
