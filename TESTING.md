# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit testing with React Testing Library for component testing.

## Overview

The testing setup includes:
- **Vitest**: Fast unit test framework with Jest-like API
- **@testing-library/react**: Simple and complete React DOM testing utilities
- **@testing-library/jest-dom**: Custom jest matchers for DOM assertions
- **jsdom**: DOM environment for testing
- **@vitejs/plugin-react**: Vite React plugin for JSX support

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Open Vitest UI
npm run test:ui

# Run tests in watch mode with file watching
npm run test:watch
```

## Test Coverage

The project includes comprehensive tests for:

### Game Logic (`src/app/config/gameFormulas.js`)
- **37 tests** covering all calculation formulas:
  - Cost calculations (employee, project, research)
  - Development point calculations with platform/genre/skill modifiers
  - Revenue calculations with quality/hype/platform factors
  - Skill improvement with diminishing returns
  - Project duration calculations
  - Morale change calculations
  - Market demand analysis

### Utility Functions (`src/utils/formatting.js`)
- **25 tests** covering formatting and helper utilities:
  - Number formatting with locale support
  - UUID generation
  - Random subset selection
  - Environment detection (browser vs server)
  - Safe logging with development checks
  - Debounce function with timer management

### React Components (`src/app/components/common/Button.jsx`)
- **25 tests** covering UI component behavior:
  - Rendering and content display
  - Event handling (click, disabled state)
  - Variant styling (primary, secondary, success, danger, warning, outline)
  - Size variations (small, medium, large)
  - Custom props and className handling
  - Accessibility attributes
  - Edge cases and error conditions

## Test Organization

Tests are located alongside source files with naming convention:
- `*.test.js` - Pure JavaScript tests (utilities, logic)
- `*.test.jsx` - React component tests (requires JSX support)

## Configuration

### Vitest Configuration (`vitest.config.js`)
- Uses jsdom environment for DOM testing
- Includes React plugin for JSX support
- Global test utilities (describe, it, expect)
- Path aliases matching project structure
- Coverage reporting with v8 provider

### Test Setup (`src/test/setup.js`)
- Configures @testing-library/jest-dom matchers
- Mocks Next.js router and navigation
- Mocks external dependencies (Chart.js, FontAwesome, react-modal, react-toastify)
- Sets up DOM environment utilities (matchMedia, ResizeObserver)

## Writing Tests

### Game Logic Tests
Focus on pure function testing with various input scenarios:

```javascript
import { calculateEmployeeCost } from './gameFormulas';

describe('calculateEmployeeCost', () => {
  it('should calculate exponential cost increase', () => {
    expect(calculateEmployeeCost(0)).toBe(1000);
    expect(calculateEmployeeCost(1)).toBeGreaterThan(1000);
  });
});
```

### Component Tests
Use React Testing Library for user-centric testing:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button.jsx';

describe('Button Component', () => {
  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Arrange, Act, Assert**: Structure tests with clear setup, execution, and verification
3. **Descriptive Test Names**: Use clear, specific test descriptions
4. **Edge Cases**: Test boundary conditions and error scenarios
5. **Mocking**: Mock external dependencies and focus on testing your code
6. **Coverage**: Aim for high coverage but prioritize critical path testing

## Current Test Results

✅ **87 tests passing**
- Game Formulas: 37 tests
- Utilities: 25 tests
- Button Component: 25 tests

All tests are currently passing with comprehensive coverage of the core game logic, utility functions, and UI components.