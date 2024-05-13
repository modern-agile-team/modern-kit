import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});
