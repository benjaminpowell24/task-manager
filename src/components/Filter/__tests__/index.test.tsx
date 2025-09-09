import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '..';

const setPriorityMock = jest.fn();

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    priority: 'all',
    setPriority: setPriorityMock,
  }),
}));

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: jest.fn(),
});

describe('Filter Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the filter dropdown with the default value', () => {
    render(<Filter />);
    const filterTrigger = screen.getByRole('combobox');
    expect(filterTrigger).toBeInTheDocument();
    expect(filterTrigger).toHaveTextContent(/all/i);
  });

  it('should display the dropdown options when clicked', async () => {
    render(<Filter />);
    const filterTrigger = screen.getByRole('combobox');

    // Open the dropdown
    fireEvent.click(filterTrigger);

    // Check if the options are rendered
    const allOption = await screen.findByTitle(/all/i);
    const lowOption = await screen.findByTitle(/low/i);
    const mediumOption = await screen.findByTitle(/medium/i);
    const highOption = await screen.findByTitle(/high/i);

    expect(allOption).toBeInTheDocument();
    expect(lowOption).toBeInTheDocument();
    expect(mediumOption).toBeInTheDocument();
    expect(highOption).toBeInTheDocument();
  });

  it('should call setPriority when an option is selected', async () => {
    render(<Filter />);
    const filterTrigger = screen.getByRole('combobox');

    // Open the dropdown
    fireEvent.click(filterTrigger);

    // Select the "Low" option
    const lowOption = await screen.findByText(/low/i);
    fireEvent.click(lowOption);

    // Check if setPriority is called with "low"
    expect(setPriorityMock).toHaveBeenCalledWith('low');
  });

});