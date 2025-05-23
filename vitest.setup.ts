import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// 在每個測試之後清理組件
afterEach(() => {
  cleanup();
});
