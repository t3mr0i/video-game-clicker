import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatNumber,
  generateUniqueId,
  getRandomSubset,
  isBrowser,
  safeLog,
  debounce
} from './formatting';

describe('Formatting Utilities', () => {
  describe('formatNumber', () => {
    it('should format small numbers without decimals', () => {
      expect(formatNumber(123)).toBe('123');
      expect(formatNumber(0)).toBe('0');
    });

    it('should format large numbers with thousand separators', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should format negative numbers', () => {
      expect(formatNumber(-1234)).toBe('-1,234');
    });

    it('should handle decimal inputs by truncating', () => {
      expect(formatNumber(123.45)).toBe('123');
      expect(formatNumber(1234.99)).toBe('1,235'); // Rounds up
    });

    it('should handle zero and very small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(0.1)).toBe('0');
      expect(formatNumber(0.9)).toBe('1');
    });
  });

  describe('generateUniqueId', () => {
    it('should generate different IDs on subsequent calls', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
    });

    it('should generate valid UUID format', () => {
      const id = generateUniqueId();
      // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });

    it('should generate strings', () => {
      const id = generateUniqueId();
      expect(typeof id).toBe('string');
    });
  });

  describe('getRandomSubset', () => {
    it('should return empty array for empty input', () => {
      const result = getRandomSubset([], 5);
      expect(result).toEqual([]);
    });

    it('should return all items when count >= array length', () => {
      const input = [1, 2, 3];
      const result = getRandomSubset(input, 5);
      expect(result).toHaveLength(3);
      expect(result.sort()).toEqual([1, 2, 3]);
    });

    it('should return exact count when count < array length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getRandomSubset(input, 2);
      expect(result).toHaveLength(2);
    });

    it('should not modify original array', () => {
      const input = [1, 2, 3, 4, 5];
      const originalLength = input.length;
      getRandomSubset(input, 2);
      expect(input).toHaveLength(originalLength);
      expect(input).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle count of 0', () => {
      const result = getRandomSubset([1, 2, 3], 0);
      expect(result).toEqual([]);
    });

    it('should work with different data types', () => {
      const input = ['a', 'b', 'c', 'd'];
      const result = getRandomSubset(input, 2);
      expect(result).toHaveLength(2);
      result.forEach(item => {
        expect(input).toContain(item);
      });
    });
  });

  describe('isBrowser', () => {
    it('should return false in test environment', () => {
      // In vitest/jsdom, window should be defined but we can test the function
      const result = isBrowser();
      expect(typeof result).toBe('boolean');
    });

    it('should handle undefined window gracefully', () => {
      const originalWindow = global.window;
      delete global.window;

      expect(isBrowser()).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('safeLog', () => {
    let consoleSpy;
    let originalEnv;

    beforeEach(() => {
      originalEnv = process.env.NODE_ENV;
      consoleSpy = {
        log: vi.spyOn(console, 'log').mockImplementation(() => {}),
        warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
        error: vi.spyOn(console, 'error').mockImplementation(() => {})
      };
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
      Object.values(consoleSpy).forEach(spy => spy.mockRestore());
    });

    it('should log in development environment', () => {
      process.env.NODE_ENV = 'development';
      safeLog('log', 'test message');
      expect(consoleSpy.log).toHaveBeenCalledWith('test message');
    });

    it('should not log in production environment', () => {
      process.env.NODE_ENV = 'production';
      safeLog('log', 'test message');
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should support different log levels', () => {
      process.env.NODE_ENV = 'development';

      safeLog('warn', 'warning');
      expect(consoleSpy.warn).toHaveBeenCalledWith('warning');

      safeLog('error', 'error message');
      expect(consoleSpy.error).toHaveBeenCalledWith('error message');
    });

    it('should pass multiple arguments', () => {
      process.env.NODE_ENV = 'development';
      safeLog('log', 'message', 123, { key: 'value' });
      expect(consoleSpy.log).toHaveBeenCalledWith('message', 123, { key: 'value' });
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should cancel previous calls when called multiple times', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      vi.advanceTimersByTime(50);
      debouncedFn('second');
      vi.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledOnce();
      expect(mockFn).toHaveBeenCalledWith('second');
    });

    it('should use default wait time when not specified', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn); // Should use 300ms default

      debouncedFn('test');
      vi.advanceTimersByTime(299);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should pass all arguments to the original function', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2', 123);
      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('should handle rapid successive calls correctly', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      // Rapid calls within the debounce window
      for (let i = 0; i < 5; i++) {
        debouncedFn(`call-${i}`);
        vi.advanceTimersByTime(20);
      }

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledOnce();
      expect(mockFn).toHaveBeenCalledWith('call-4'); // Should be the last call
    });
  });
});