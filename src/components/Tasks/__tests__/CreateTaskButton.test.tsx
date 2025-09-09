import '@testing-library/jest-dom'
import CreateTaskButton from '../CreateTaskButton';
import { render, screen} from "@testing-library/react";
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

describe("Create Task Button test suite", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the add task button", () => {
    render(<CreateTaskButton />);
    const button = screen.getByRole("button", { name: /add task/i });
    expect(button).toBeInTheDocument();
  });

});
