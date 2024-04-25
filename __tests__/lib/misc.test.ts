import { createQueryString } from '@/src/lib/misc';

describe('createQueryString', () => {
  test('should create query string with provided query object', () => {
    const queryObject = {
      params1: 'value1',
      params2: 'value2',
      params3: '',
    };

    const queryString = createQueryString({ queryObject });

    expect(queryString).toBe('params1=value1&params2=value2');
  });

  test('should handle empty query parameters correctly', () => {
    const queryObject = {
      params1: '',
      params2: 'value2',
    };

    const queryString = createQueryString({ queryObject });

    expect(queryString).toBe('params2=value2');
  });

  test('should handle array query parameters correctly', () => {
    const queryObject = {
      params1: ['value1', 'value2'],
      params2: 'value3',
    };

    const queryString = createQueryString({ queryObject });

    expect(queryString).toBe('params1=value1&params1=value2&params2=value3');
  });

  test('should handle URLSearchParams correctly', () => {
    const searchParams = new URLSearchParams('params1=value1&params2=value2');
    const queryObject = {
      params3: 'value3',
    };

    const queryString = createQueryString({ searchParams, queryObject });

    expect(queryString).toBe('params1=value1&params2=value2&params3=value3');
  });

  test('should handle string[][] correctly', () => {
    const searchParams: string[][] = [
      ['params1', 'value1'],
      ['params2', 'value2'],
    ];
    const queryObject = {
      params3: 'value3',
    };

    const queryString = createQueryString({ searchParams, queryObject });

    expect(queryString).toBe('params1=value1&params2=value2&params3=value3');
  });

  test('should handle Record<string, string> correctly', () => {
    const searchParams: Record<string, string> = {
      params1: 'value1',
      params2: 'value2',
    };
    const queryObject = {
      params3: 'value3',
    };

    const queryString = createQueryString({ searchParams, queryObject });

    expect(queryString).toBe('params1=value1&params2=value2&params3=value3');
  });
});
