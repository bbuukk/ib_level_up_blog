import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Counter from './ExampleCounter';
import { renderRoute } from 'tests/wrappers';

vi.mock('utils/axios', () => ({
  getMe: vi.fn().mockResolvedValue({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    email_verified_at: null,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  })
}));
import { getMe } from 'utils/axios';

describe.skip('Counter', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test, so tests are isolated
  });

  it.only('renders correctly', () => {
    const conatiner = render(<Counter />);
    expect(conatiner).toMatchSnapshot();
  });
  it.only('calls getMe on mount', async () => {
    render(<Counter />);
    await waitFor(() => expect(getMe).toHaveBeenCalled());
  });
  it('renders initial count and increments when button is clicked', () => {
    render(<Counter />);

    // Check initial render
    // getByText: RTL query
    // toBeInTheDocument: jest-dom matcher
    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    // Click button and check if count incremented
    const button = screen.getByText('Increment');
    // fireEvent : RTL API
    fireEvent.click(button);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/count: 0/i)).not.toBeInTheDocument();
  });
  it('updates the value of the input when typing on it', () => {
    render(<Counter />);

    const input = screen.getByLabelText('Name:');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input).toHaveValue('John Doe');
  });
  it('typing in an input - with userEvent', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const textbox = screen.getByLabelText('Name:');
    const testDataTestId = screen.getByTestId('name-input');
    const testRole = screen.getByRole('textbox', { name: 'Name:' });
    await user.type(textbox, 'Hello');

    //screen.debug(undefined, Infinity);

    expect(textbox).toHaveValue('Hello');
  });

  it('test counter in app', async () => {
    const container = renderRoute({
      memoryRouterOptions: { initialEntries: ['/playground'] }
    });

    // Check initial render
    expect(await container.findByText('Count: 0')).toBeInTheDocument();

    // Click button and check if count incremented
    const button = container.getByText('Increment');
    fireEvent.click(button);
    expect(container.getByText('Count: 1')).toBeInTheDocument();
  });
});
