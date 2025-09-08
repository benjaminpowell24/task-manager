import '@testing-library/jest-dom'
import TaskList from "..";
import {render, screen} from "@testing-library/react";

describe("TaskList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of tasks", () => {
    render(<TaskList/>);
    const taskElements = screen.getAllByRole("listitem");
    expect(taskElements).toHaveLength(3);
  });
});
