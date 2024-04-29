import { describe, expect, it } from 'vitest';
import { screen, renderHook } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import useBlockDoubleClick from '.';

const delay = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

describe('useBlockDoubleClick', () => {
  it('should block double click', async () => {
    const { result } = renderHook(useBlockDoubleClick);

    const { isLoading, blockDoubleClick } = result.current;
    expect(isLoading).toBe(false);

    let counter = 0;
    const clickEvent = async () => {
      counter = counter + 1;
      await delay(1000);
    };

    const onClick = () => blockDoubleClick(clickEvent);

    const { user } = renderSetup(<button onClick={onClick}>TestButton</button>);

    const button = screen.getByText('TestButton');

    await user.click(button);
    await user.click(button);

    expect(result.current.isLoading).toBe(true);

    expect(counter).toBe(1);
  });
});
