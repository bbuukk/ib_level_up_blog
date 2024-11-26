import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginFormModal from './LoginFormModal';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>{ui}</MantineProvider>
    </QueryClientProvider>
  );
};

describe('LoginFormModal', () => {
  it('displays validation errors for invalid inputs', async () => {
    renderWithProviders(
      <LoginFormModal
        isOpen={true}
        closeModal={() => {}}
        switchModal={() => {}}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'short');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(
        screen.getByText('String must contain at least 8 character(s)')
      ).toBeInTheDocument();
    });
  });
});
