import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';
import { handlers } from './serverHandlers';

const matchMediaMock = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

vi.stubGlobal('matchMedia', matchMediaMock);

//MSW server setup
export const server = setupServer(...handlers);

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());
