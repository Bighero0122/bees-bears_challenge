import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PersonalInfo } from '../PersonalInfo';
import { useWizardStore } from '../../../hooks/useWizardStore';

jest.mock('../../../hooks/useWizardStore');

describe('PersonalInfo Component', () => {
  beforeEach(() => {
    ((useWizardStore as unknown) as jest.Mock).mockReturnValue({
      data: { personalInfo: {} },
      updateData: jest.fn(),
      setStep: jest.fn(),
    });
  });

  it('renders the form fields', () => {
    render(<PersonalInfo />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<PersonalInfo />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    // Add assertions to check if updateData and setStep were called
  });

  it('does not submit the form with invalid data', async () => {
    render(<PersonalInfo />);
    
    // Enter invalid first name (e.g., empty string)
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    
    // Enter invalid last name (e.g., numbers included)
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '123' } });
    
    // Enter invalid date of birth (e.g., 1900-01-01)
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1900-01-01' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Wait for validation error messages to appear
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Only Latin and German letters allowed/i)).toBeInTheDocument();
      expect(screen.getByText(/Maximum age is 79 years/i)).toBeInTheDocument();
    });
    
    // Ensure updateData and setStep are not called
    const mockUpdateData = (useWizardStore as unknown as jest.Mock).mock.results[0].value.updateData;
    const mockSetStep = (useWizardStore as unknown as jest.Mock).mock.results[0].value.setStep;
    expect(mockUpdateData).not.toHaveBeenCalled();
    expect(mockSetStep).not.toHaveBeenCalled();
  });
});
