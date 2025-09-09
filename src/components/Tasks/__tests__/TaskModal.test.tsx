import '@testing-library/jest-dom'
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import TaskModal from '../TaskModal';

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    setTasks: jest.fn()
  })
}));


describe("Task Modal test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the task dialog", () => {
    render(<TaskModal isModalOpen={true} handleModalClose={jest.fn()} />);
    const taskElement = screen.getByRole("dialog");
    expect(taskElement).toBeInTheDocument();
  });

  it('should show the form fields for creating a task', () => {
    render(<TaskModal isModalOpen={true} handleModalClose={jest.fn()} />);
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
  });

  it('should render the priority select option with low selected', async () => {
    render(<TaskModal isModalOpen={true} handleModalClose={jest.fn()} />);
    const prioritySelect = screen.getByLabelText(/priority/i);

    // Open the dropdown
    fireEvent.mouseDown(prioritySelect);

    // Check if the options are rendered
    const lowOption = await screen.findByText(/low/i);

    expect(lowOption).toBeInTheDocument();
  });

  it('should display existing task data when in edit mode', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'tasks') {
        return JSON.stringify([
          { id: 1, name: 'Test Task', description: 'Test Description', priority: 'medium' },
        ]);
      }
      return null;
    });

    render(<TaskModal isModalOpen={true} handleModalClose={jest.fn()}
    mode="edit" taskId={1} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
    expect(titleInput).toHaveValue('Test Task');
    expect(descriptionInput).toHaveValue('Test Description');
    expect(prioritySelect).toHaveTextContent(/medium/i);
  });

  it('should call handleModalClose when cancel button is clicked', () => {
    const handleModalClose = jest.fn();
    render(<TaskModal isModalOpen={true} handleModalClose={handleModalClose} />);
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(handleModalClose).toHaveBeenCalled();
  });

  it('should call handleUpdate when update button is clicked in edit mode', () => {
    const handleUpdate = jest.spyOn(Storage.prototype, 'setItem');

    render(<TaskModal isModalOpen={true} handleModalClose={jest.fn()} mode="edit" taskId={1} />);
    const updateButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(updateButton);
    expect(handleUpdate).toHaveBeenCalled();
  });

  it('should close the modal when clicking outside the dialog', async() => {
    const handleModalClose = jest.fn();
    render(<TaskModal isModalOpen={true} handleModalClose={handleModalClose} />);
    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(handleModalClose).toHaveBeenCalled());
  });

  it('should close the modal when the close button is clicked', async() => {
    const handleModalClose = jest.fn();
    render(<TaskModal isModalOpen={true} handleModalClose={handleModalClose} />);
    const closeButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    await waitFor(() => expect(handleModalClose).toHaveBeenCalled());
  });

});
