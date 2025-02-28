import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactDetails } from '../ContactDetails';
import { useWizardStore } from '../../../hooks/useWizardStore';

// Mock the useWizardStore hook
jest.mock('../../../hooks/useWizardStore');

describe('ContactDetails Component', () => {
  const mockUpdateData = jest.fn();
  const mockSetStep = jest.fn();

  beforeEach(() => {
    ((useWizardStore as unknown) as jest.Mock).mockReturnValue({
      data: { contactDetails: { email: '', phone: '' } },
      updateData: mockUpdateData,
      setStep: mockSetStep,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with email and phone fields', () => {
    render(<ContactDetails />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });


  test('calls updateData and setStep on valid form submission', async () => {
    render(<ContactDetails />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/phone/i), {
      target: { value: '+1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockUpdateData).toHaveBeenCalledWith({
        contactDetails: { email: 'test@example.com', phone: '+1234567890' },
      });
      expect(mockSetStep).toHaveBeenCalledWith(3);
    });
  });

  test('does not call updateData and setStep on invalid form submission', async () => {
    render(<ContactDetails />);

    // Simulate invalid email and phone input
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.input(screen.getByLabelText(/phone/i), {
      target: { value: 'invalid-phone' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockUpdateData).not.toHaveBeenCalled();
      expect(mockSetStep).not.toHaveBeenCalled();
    });
  });

});