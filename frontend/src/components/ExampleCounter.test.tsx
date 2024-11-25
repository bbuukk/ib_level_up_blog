import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Counter from './ExampleCounter';
import { renderRoute } from 'tests/wrappers';

describe('Counter', () => {
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
