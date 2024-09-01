import * as extensions from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import { expect } from 'vitest';

expect.extend(extensions);

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});
