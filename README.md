# BnB Coding Challenge

A React-based multi-step wizard application designed to collect user input in an organized and structured manner. This project was created as part of the BnB coding challenge.

## Features

- Multi-step form wizard for user data collection
- Step-by-step validation using Zod
- Data persistence through API calls
- Navigation between steps with data persistence
- Page reload handling to restore user progress
- Success and error notifications using React Toastify
- Responsive design with Chakra UI
- TypeScript for type safety
- React Hook Form for form management
- Zustand for state management
- Unit testing with Jest and React Testing Library

## Application Setup Guide

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Bighero0122/bees-bears_challenge.git
cd bnb-coding-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

4. Start the mock backend server:

```bash
node fastify.mjs 
```

The mock backend will be available at `http://localhost:3000`

### Running Tests

```bash
npm test
```

## Worklog

### Session 1 (0.5 hour)
- Project initialization and setup
- Basic project structure and dependencies
- Initial implementation of Personal Information step
- Set up mock backend

### Session 2 (1 hour)
- Contact Details step implementation
- Loan Request step with validation logic
- API integration setup

### Session 3 (1 hour)
- Financial Information step with complex validation
- Finalization step with data review
- Navigation and data persistence between steps

### Session 4 (1.5 hour)
- Unit tests implementation
- Code cleanup and optimization
- Documentation
- Final testing and bug fixes

## Project Structure

```
src/
├── components/
│   ├── FormSteps/
│   │   ├── __tests__/  
│   │   │   ├── PersonalInfo.test.tsx
│   │   │   ├── ContactDetails.test.tsx
│   │   │   ├── FinancialInfo.test.tsx
│   │   │   └── LoanRequest.test.tsx
│   │   ├── ContactDetails.tsx
│   │   ├── FinancialInfo.tsx
│   │   ├── LoanRequest.tsx
│   │   ├── PersonalInfo.tsx
│   │   └── Finalization.tsx
│   ├── WizardLayout.tsx
│   └── WizardNavigation.tsx
├── hooks/
│   └── useWizardStore.ts
├── schemas/
│   └── validation.ts
├── types/
│   ├── css.d.ts
│   └── wizard.ts
├── api/
│   └── client.ts
├── setupTests.ts
├── index.css
└── main.tsx
```

## Future Improvements and Recommendations

1. **Performance Optimizations**
   - Optimize API calls with debouncing
   - Implement lazy loading for form components

2. **Feature Enhancements**
   - Add more detailed validation feedback
   - Implement a progress bar for the wizard
   - Add user authentication for data security

3. **Technical Improvements**
   - Add end-to-end testing
   - Improve error handling with error boundaries
   - Enhance TypeScript types and interfaces

4. **UI/UX Improvements**
   - Add animations for step transitions
   - Implement dark mode
   - Improve mobile responsiveness

## Technologies Used

- React
- TypeScript
- React Router
- Zod
- React Hook Form
- Axios
- Jest & React Testing Library
- Chakra UI
- Zustand
- React Toastify

## API Integration

The application integrates with a local Fastify server for data persistence:

- **POST /entities**: Creates a new entity and returns the entity with a **uuid**.
- **GET /entities/:uuid**: Retrieves an entity by its **uuid**.
- **PATCH /entities/:uuid**: Updates an existing entity by its **uuid**.

## Testing

The project includes unit tests for:
- Validation schemas
- Form components

## Notes

This project was completed as part of the BnB coding challenge within a 4-hour timeframe. The focus was on creating a clean, maintainable codebase while implementing all required features and following best practices.

