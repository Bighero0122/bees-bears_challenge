import '@testing-library/jest-dom';
import React from 'react';

// Mock toast functions
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn()
  },
  ToastContainer: jest.fn().mockImplementation(({ children }) => React.createElement('div', null, children))
}));