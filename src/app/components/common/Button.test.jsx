import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button.jsx';

describe('Button Component', () => {
  it('should render with children content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply disabled attribute when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not be disabled by default', () => {
    render(<Button>Normal Button</Button>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  describe('Variants', () => {
    it('should apply primary variant classes by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-blue-500');
      expect(button.className).toContain('hover:bg-blue-600');
      expect(button.className).toContain('text-white');
    });

    it('should apply secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-gray-500');
      expect(button.className).toContain('hover:bg-gray-600');
    });

    it('should apply success variant classes', () => {
      render(<Button variant="success">Success</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-green-500');
      expect(button.className).toContain('hover:bg-green-600');
    });

    it('should apply danger variant classes', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-red-500');
      expect(button.className).toContain('hover:bg-red-600');
    });

    it('should apply warning variant classes', () => {
      render(<Button variant="warning">Warning</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-yellow-500');
      expect(button.className).toContain('hover:bg-yellow-600');
    });

    it('should apply outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border');
      expect(button.className).toContain('border-blue-500');
      expect(button.className).toContain('text-blue-500');
    });
  });

  describe('Sizes', () => {
    it('should apply medium size classes by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('py-2');
      expect(button.className).toContain('px-4');
    });

    it('should apply small size classes', () => {
      render(<Button size="small">Small</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('py-1');
      expect(button.className).toContain('px-2');
      expect(button.className).toContain('text-sm');
    });

    it('should apply large size classes', () => {
      render(<Button size="large">Large</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('py-3');
      expect(button.className).toContain('px-6');
      expect(button.className).toContain('text-lg');
    });
  });

  describe('Disabled State', () => {
    it('should apply opacity and cursor styles when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('opacity-50');
      expect(button.className).toContain('cursor-not-allowed');
    });

    it('should apply hover effects when not disabled', () => {
      render(<Button>Enabled</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('hover:scale-105');
    });

    it('should not apply hover effects when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button.className).not.toContain('hover:scale-105');
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className along with default classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
      expect(button.className).toContain('bg-blue-500'); // Still has default variant
    });

    it('should forward additional props to button element', () => {
      render(<Button data-testid="custom-button" type="submit">Submit</Button>);
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should handle aria attributes', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });
  });

  describe('Base Styling', () => {
    it('should always include base button classes', () => {
      render(<Button>Base</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('font-bold');
      expect(button.className).toContain('rounded');
      expect(button.className).toContain('transition');
      expect(button.className).toContain('duration-300');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<Button></Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle JSX children', () => {
      render(
        <Button>
          <span>Icon</span> Text
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Icon Text');
    });

    it('should handle invalid variant gracefully', () => {
      render(<Button variant="invalid">Invalid</Button>);
      const button = screen.getByRole('button');
      // Should not crash and still render as a button
      expect(button).toBeInTheDocument();
    });

    it('should handle invalid size gracefully', () => {
      render(<Button size="invalid">Invalid Size</Button>);
      const button = screen.getByRole('button');
      // Should not crash and still render as a button
      expect(button).toBeInTheDocument();
    });
  });
});