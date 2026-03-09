import "@testing-library/jest-dom";

// Mock of API key
process.env.VITE_TMDB_API_KEY = "fake_api_key";

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({}) })
) as jest.Mock;

// Clean mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});