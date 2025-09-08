import '@testing-library/jest-dom'
import { Task } from "../../components/Task";
import {render, screen} from "@testing-library/react";

describe("Task", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task", () => {
    render(<Task id={1} name="Test Task" description="This is a test task" priority="high" />);
    const taskElement = screen.getByRole("listitem");
    expect(taskElement).toBeInTheDocument();
  });
});
