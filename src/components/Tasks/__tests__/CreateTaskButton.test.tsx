import '@testing-library/jest-dom'
import CreateTaskButton from '../CreateTaskButton';
import { fireEvent, render, screen} from "@testing-library/react";
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

jest.mock('../TaskModal', () => () => <div>Mocked Task Modal</div>);

 const mockHandleModalOpen = jest.fn();

describe("Create Task Button test suite", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the add task button", () => {
    render(<CreateTaskButton handleModalOpen={mockHandleModalOpen} />);
    const button = screen.getByRole("button", { name: /add task/i });
    expect(button).toBeInTheDocument();
  });

  it("should call handleModalOpen when the button is clicked", () => {
    render(<CreateTaskButton handleModalOpen={mockHandleModalOpen} />);
    const button = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(button);
    expect(mockHandleModalOpen).toHaveBeenCalledTimes(1);
  });

 });
