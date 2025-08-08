import { describe, it, expect, vi } from 'vitest';
import { mergeEventHandlers } from './index';

describe('mergeEventHandlers', () => {
  it('모든 핸들러가 순서대로 호출되어야 한다', () => {
    const order: number[] = [];
    const handler1 = vi.fn(() => {
      order.push(1);
    });
    const handler2 = vi.fn(() => {
      order.push(2);
    });
    const handler3 = vi.fn(() => {
      order.push(3);
    });

    const event = {} as any;
    const mergedHandler = mergeEventHandlers(handler1, handler2, handler3);

    mergedHandler(event);
    expect(order).toEqual([1, 2, 3]);
  });

  it('핸들러가 false를 반환할 경우 이후 핸들러의 실행을 중단해야 한다', () => {
    const handler1 = vi.fn(() => true);
    const handler2 = vi.fn(() => false);
    const handler3 = vi.fn(() => true);

    const event = {} as any;
    const mergedHandler = mergeEventHandlers(handler1, handler2, handler3);

    mergedHandler(event);

    expect(handler1).toHaveBeenCalledWith(event);
    expect(handler2).toHaveBeenCalledWith(event);
    expect(handler3).not.toHaveBeenCalled();
  });
});
