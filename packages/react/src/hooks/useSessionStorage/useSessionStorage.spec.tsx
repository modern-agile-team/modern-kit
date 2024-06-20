import { renderHook, waitFor } from '@testing-library/react';
import { useSessionStorage } from '.';
import { renderToString } from 'react-dom/server';

afterEach(() => {
  sessionStorage.clear();
});

describe('useSessionStorage', () => {
  it('should initialize with the default value if no value is in sessionStorage', () => {
    const { result } = renderHook(() =>
      useSessionStorage({ key: 'test', initialValue: 'default' })
    );

    expect(result.current.state).toBe('default');
  });

  it('should initialize with the default function return value if no value is in sessionStorage', () => {
    const { result } = renderHook(() =>
      useSessionStorage({ key: 'test', initialValue: () => 'default' })
    );

    expect(result.current.state).toBe('default');
  });

  it('should initialize with the value from sessionStorage', () => {
    sessionStorage.setItem('test', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useSessionStorage({ key: 'test', initialValue: 'default' })
    );

    expect(result.current.state).toBe('storedValue');
  });

  it('should update sessionStorage when state changes(1)', async () => {
    const { result } = renderHook(() =>
      useSessionStorage({ key: 'test', initialValue: 'default' })
    );

    await waitFor(() => {
      result.current.setState('newValue');
    });

    expect(result.current.state).toBe('newValue');
    expect(sessionStorage.getItem('test')).toBe(JSON.stringify('newValue'));
  });

  it('should update sessionStorage when state changes(2)', async () => {
    sessionStorage.setItem('test', JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() =>
      useSessionStorage({ key: 'test', initialValue: [1, 2, 3] })
    );

    await waitFor(() => {
      result.current.setState((state) => [...state, 4]);
    });

    expect(result.current.state).toEqual([1, 2, 3, 4]);
    expect(sessionStorage.getItem('test')).toBe(JSON.stringify([1, 2, 3, 4]));
  });

  it('should remove the value from sessionStorage', async () => {
    sessionStorage.setItem('test', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useSessionStorage<string>({ key: 'test' })
    );

    await waitFor(() => {
      result.current.removeState();
    });

    expect(result.current.state).toBeNull();
    expect(sessionStorage.getItem('test')).toBeNull();
  });

  it('should render initial value during server-side rendering', async () => {
    const TestComponent = () => {
      const { state } = useSessionStorage({ key: 'test', initialValue: 'ssr' });
      return <p>{state}</p>;
    };

    const html = renderToString(<TestComponent />); // server side rendering

    expect(html).toContain('ssr');
  });

  it('should infer the type based on the presence of initialValue', () => {
    const { result: result1 } = renderHook(() =>
      useSessionStorage<string>({ key: 'test' })
    );
    expectTypeOf(result1.current.state).toEqualTypeOf<string | null>();

    const { result: result2 } = renderHook(() =>
      useSessionStorage<string>({ key: 'test', initialValue: 'default' })
    );
    expectTypeOf(result2.current.state).toEqualTypeOf<string>();
  });

  it('should throw an error when sessionStorage contains invalid JSON', async () => {
    sessionStorage.setItem('test', "{key: 'value'}");

    expect(() => {
      return renderHook(() => useSessionStorage({ key: 'test' }));
    }).toThrowError();
  });

  it('should throw an error when setting an item in sessionStorage fails', async () => {
    const { result } = renderHook(() => useSessionStorage({ key: 'test' }));

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error();
    });

    expect(() => result.current.setState('error')).toThrowError();
  });

  it('should throw an error when removing an item from sessionStorage fails', async () => {
    const { result } = renderHook(() => useSessionStorage({ key: 'test' }));

    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error();
    });

    expect(() => result.current.removeState()).toThrowError();
  });
});
