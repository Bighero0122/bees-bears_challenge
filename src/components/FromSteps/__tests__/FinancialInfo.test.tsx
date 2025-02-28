import { render, screen, fireEvent } from '@testing-library/react';
import { FinancialInfo } from '../FinancialInfo';
import { useWizardStore } from '../../../hooks/useWizardStore';

jest.mock('../../../hooks/useWizardStore');

describe('FinancialInfo Component', () => {
  beforeEach(() => {
    ((useWizardStore as unknown) as jest.Mock).mockReturnValue({
      data: { financialInfo: {} },
      updateData: jest.fn(),
      setStep: jest.fn(),
    });
  });

  it('renders the form fields', () => {
    render(<FinancialInfo />);
    expect(screen.getByLabelText(/Monthly Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I have additional income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I have a mortgage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I have other credits/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<FinancialInfo />);
    fireEvent.change(screen.getByLabelText(/Monthly Salary/i), { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    // Add assertions to check if updateData and setStep were called
  });
});
