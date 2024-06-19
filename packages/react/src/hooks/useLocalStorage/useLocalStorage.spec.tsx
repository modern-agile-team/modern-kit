import { renderHook, waitFor } from '@testing-library/react';
import { useLocalStorage } from '.';
import { renderToString } from 'react-dom/server';

afterEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('should initialize with the default value if no value is in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', initialValue: 'default' })
    );

    expect(result.current.state).toBe('default');
  });

  it('should initialize with the default function return value if no value is in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', initialValue: () => 'default' })
    );

    expect(result.current.state).toBe('default');
  });

  it('should initialize with the value from localStorage', () => {
    localStorage.setItem('test', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', initialValue: 'default' })
    );

    expect(result.current.state).toBe('storedValue');
  });

  it('should update localStorage when state changes(1)', async () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', initialValue: 'default' })
    );

    await waitFor(() => {
      result.current.setState('newValue');
    });

    expect(result.current.state).toBe('newValue');
    expect(localStorage.getItem('test')).toBe(JSON.stringify('newValue'));
  });

  it('should update localStorage when state changes(2)', async () => {
    localStorage.setItem('test', JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', initialValue: [1, 2, 3] })
    );

    await waitFor(() => {
      result.current.setState((state) => [...(state || []), 4]);
    });

    expect(result.current.state).toEqual([1, 2, 3, 4]);
    expect(localStorage.getItem('test')).toBe(JSON.stringify([1, 2, 3, 4]));
  });

  it('should remove the value from localStorage', async () => {
    localStorage.setItem('test', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage({ key: 'test' }));

    await waitFor(() => {
      result.current.removeState();
    });

    expect(result.current.state).toBeNull();
    expect(localStorage.getItem('test')).toBeNull();
  });

  it('should render initial value during server-side rendering', async () => {
    const TestComponent = () => {
      const { state } = useLocalStorage({ key: 'test', initialValue: 'ssr' });
      return <p>{state}</p>;
    };

    const html = renderToString(<TestComponent />); // server side rendering

    expect(html).toContain('ssr');
  });

  it('should throw an error when localStorage contains invalid JSON', async () => {
    localStorage.setItem('test', "{key: 'value'}");

    expect(() => {
      return renderHook(() => useLocalStorage({ key: 'test' }));
    }).toThrowError();
  });

  it('should throw an error when setting an item in localStorage fails', async () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'test' }));

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error();
    });

    expect(() => result.current.setState('error')).toThrowError();
  });

  it('should throw an error when removing an item from localStorage fails', async () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'test' }));

    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error();
    });

    expect(() => result.current.removeState()).toThrowError();
  });
});
