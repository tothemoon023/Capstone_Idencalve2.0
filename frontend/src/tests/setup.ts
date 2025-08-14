import '@testing-library/jest-dom';

// Mock Solana wallet adapters
global.window.solana = {
  isPhantom: true,
  connect: jest.fn().mockResolvedValue({ publicKey: { toString: () => 'mock-wallet-address' } }),
  disconnect: jest.fn().mockResolvedValue({}),
  signMessage: jest.fn().mockResolvedValue({ signature: 'mock-signature' }),
  signTransaction: jest.fn().mockResolvedValue({}),
  signAllTransactions: jest.fn().mockResolvedValue([]),
};

// Mock fetch for API calls
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, data: {} }),
  })
);

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
