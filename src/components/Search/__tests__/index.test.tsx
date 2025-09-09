import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../index';

const setSearchTermMock = jest.fn();

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    searchTerm: '',
    setSearchTerm: setSearchTermMock,
  }),
}));

describe('Search Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search input field', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/search tasks.../i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
  });


  it('should call setSearchTerm when the input value changes', () => {

    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/search tasks.../i);

    fireEvent.change(searchInput, { target: { value: 'new task' } });
    expect(setSearchTermMock).toHaveBeenCalledWith('new task');
  });
});