import 'vitest';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    type Assertion<T = any> = TestingLibraryMatchers<T, void>;
  }
}
