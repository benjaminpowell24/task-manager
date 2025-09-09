import '@testing-library/jest-dom'
import { Task } from "../Task";
import {render, screen} from "@testing-library/react";
import type { TaskType } from '../types';

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    setTasks: jest.fn()
  })
}));

const mockTask: TaskType = { id: 1, name: "Test Task", description: "This is a test task", priority: "high" };


  const mockindex = 0;
  const mockDraggedTaskId = null;
  const dragOverIndex = null;
  const onDragStart = jest.fn();
  const onDragOver = jest.fn();
  const onDragLeave = jest.fn();
  const onDrop = jest.fn();
  const onDragEnd = jest.fn();
  const handleEdit = jest.fn();


describe("Task test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task with name, description, and priority", () => {
    render(<Task task={mockTask} index={mockindex} draggedTaskId={mockDraggedTaskId} dragOverIndex={dragOverIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} handleEdit={handleEdit}/>);
    const taskElement = screen.getByTestId("draggable");
    expect(taskElement).toBeInTheDocument();
  });

  it('should have an edit task button', () => {
    render(<Task task={mockTask} index={mockindex} draggedTaskId={mockDraggedTaskId} dragOverIndex={dragOverIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} handleEdit={handleEdit}/>);
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it('should have a delete task button', () => {
    render(<Task task={mockTask} index={mockindex} draggedTaskId={mockDraggedTaskId} dragOverIndex={dragOverIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} handleEdit={handleEdit}/>);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
