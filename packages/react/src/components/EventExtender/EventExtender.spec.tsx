import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';
import { screen, waitFor } from '@testing-library/react';
import { delay } from '@modern-kit/utils';
import { EventExtender } from '.';

const DELAY = 200;

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('EventExtender', () => {
  describe('기본 동작', () => {
    it('beforeEvent, 원래 이벤트 핸들러, afterEvent가 순서대로 호출되어야 합니다.', async () => {
      const array: string[] = [];

      const { user } = renderSetup(
        <EventExtender
          capture="onClick"
          beforeEvent={() => {
            array.push('before');
          }}
          afterEvent={() => {
            array.push('after');
          }}>
          <button onClick={() => array.push('origin')}>Button</button>
        </EventExtender>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(array).toEqual(['before', 'origin', 'after']);
    });

    it('shouldAwait가 true일 경우 비동기 이벤트 핸들러의 순서가 보장되어야 합니다.', async () => {
      const array: string[] = [];

      const { user } = renderSetup(
        <EventExtender
          shouldAwait
          capture="onClick"
          beforeEvent={async () => {
            await delay(DELAY);
            array.push('before');
          }}
          afterEvent={async () => {
            await delay(DELAY);
            array.push('after');
          }}>
          <button
            onClick={async () => {
              await delay(DELAY);
              array.push('origin');
            }}>
            Button
          </button>
        </EventExtender>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      vi.advanceTimersByTime(DELAY);
      await waitFor(() => expect(array).toEqual(['before']));

      vi.advanceTimersByTime(DELAY);
      await waitFor(() => expect(array).toEqual(['before', 'origin']));

      vi.advanceTimersByTime(DELAY);
      await waitFor(() => expect(array).toEqual(['before', 'origin', 'after']));
    });

    it('afterEvent가 정의되지 않았을 경우에도 정상적으로 동작해야 합니다.', async () => {
      const array: string[] = [];

      const { user } = renderSetup(
        <EventExtender
          capture="onClick"
          beforeEvent={() => {
            array.push('before');
          }}>
          <button onClick={() => array.push('origin')}>Button</button>
        </EventExtender>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(array).toEqual(['before', 'origin']);
    });

    it('beforeEvent가 정의되지 않았을 경우에도 정상적으로 동작해야 합니다.', async () => {
      const array: string[] = [];

      const { user } = renderSetup(
        <EventExtender
          capture="onClick"
          afterEvent={() => {
            array.push('after');
          }}>
          <button onClick={() => array.push('origin')}>Button</button>
        </EventExtender>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(array).toEqual(['origin', 'after']);
    });
  });
});
