import '@testing-library/jest-dom'
import TaskList from "..";
import {render, screen} from "@testing-library/react";
import type { TaskType } from '../types';

const mockTasks: TaskType[] = [
  { id: 1, name: "Test Task 1", description: "This is a test task", priority: "high" },
  { id: 2, name: "Test Task 2", description: "This is a test task", priority: "medium" },
  { id: 3, name: "Test Task 3", description: "This is a test task", priority: "low" }
];

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    tasks: mockTasks,
    setTasks: jest.fn()
  })
}));

describe("TaskList", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of tasks", () => {
    render(<TaskList tasks={mockTasks} handleEdit={()=>{}}/>);
    const taskElements = screen.getAllByTestId("draggable");
    expect(taskElements).toHaveLength(3);
  });
});
