import '@testing-library/jest-dom'
import { Task } from "../../components/Task";
import {render, screen} from "@testing-library/react";

describe("Task", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task", () => {
    render(<Task name="Test Task" description="This is a test task" priority="High" />);
    const taskElement = screen.getByRole("listitem");
    expect(taskElement).toBeInTheDocument();
  });
});
