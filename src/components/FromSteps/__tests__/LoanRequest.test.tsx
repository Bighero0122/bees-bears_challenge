import { render, screen, fireEvent } from '@testing-library/react';
import { LoanRequest } from '../LoanRequest';
import { useWizardStore } from '../../../hooks/useWizardStore';

jest.mock('../../../hooks/useWizardStore');

describe('LoanRequest Component', () => {
  beforeEach(() => {
    ((useWizardStore as unknown) as jest.Mock).mockReturnValue({
      data: { loanRequest: {} },
      updateData: jest.fn(),
      setStep: jest.fn(),
    });
  });

  it('renders the form fields', () => {
    render(<LoanRequest />);
    expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upfront Payment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Terms \(months\)/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<LoanRequest />);
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '20000' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    // Add assertions to check if updateData and setStep were called
  });
});
