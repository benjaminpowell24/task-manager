import "@testing-library/jest-dom";
import { Task } from "../Task";
import { render, screen, fireEvent } from "@testing-library/react";
import type { TaskType } from "../types";

jest.mock("../../../context/TaskContext", () => ({
  useTaskContext: () => ({
    setTasks: jest.fn(),
  }),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockTask: TaskType = {
  id: 1,
  name: "Test Task",
  description: "This is a test task",
  priority: "high",
};

const mockindex = 0;
const mockDraggedTaskId = null;
const dragOverIndex = null;
const onDragStart = jest.fn();
const onDragOver = jest.fn();
const onDragLeave = jest.fn();
const onDrop = jest.fn();
const onDragEnd = jest.fn();
const handleEdit = jest.fn();

const defaultProps = {
  task: mockTask,
  index: mockindex,
  draggedTaskId: mockDraggedTaskId,
  dragOverIndex,
  onDragStart,
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDrop,
  handleEdit,
};

describe("Task test suite", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockTask]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a task with name, description, and priority", () => {
    render(<Task {...defaultProps} />);
    const taskElement = screen.getByTestId("draggable");
    expect(taskElement).toBeInTheDocument();
  });

  it("should display edit task button", () => {
    render(<Task {...defaultProps} />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it("should display delete task button", () => {
    render(<Task {...defaultProps} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("should be draggable", () => {
    render(<Task {...defaultProps} />);
    const taskElement = screen.getByTestId("draggable");
    expect(taskElement).toHaveAttribute("draggable", "true");
  });

  it("should call onDragStart when drag starts", () => {
    render(<Task {...defaultProps} />);
    const taskElement = screen.getByTestId("draggable");

    fireEvent.dragStart(taskElement);

    expect(onDragStart).toHaveBeenCalledWith(expect.any(Object), mockTask.id);
  });

  it("should call onDragOver when dragged over", () => {
    render(<Task {...defaultProps} />);
    const taskElement = screen.getByTestId("draggable");

    fireEvent.dragOver(taskElement);

    expect(onDragOver).toHaveBeenCalledWith(expect.any(Object), mockindex);
  });

  it("should call onDrop when dropped", () => {
    render(<Task {...defaultProps} />);
    const taskElement = screen.getByTestId("draggable");

    fireEvent.drop(taskElement);

    expect(onDrop).toHaveBeenCalledWith(expect.any(Object), mockindex);
  });

  it("should apply dragged styling when being dragged", () => {
    const props = { ...defaultProps, draggedTaskId: mockTask.id };
    render(<Task {...props} />);

    const taskElement = screen.getByTestId("draggable");
    expect(taskElement).toHaveClass("opacity-50", "scale-95");
  });

  it("should apply drag-over styling when dragged over", () => {
    const props = { ...defaultProps, dragOverIndex: mockindex };
    render(<Task {...props} />);

    const taskElement = screen.getByTestId("draggable");
    expect(taskElement).toHaveClass("ring-2", "ring-blue-500");
  });
});
