module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  roots: ['<rootDir>/src'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  verbose: true,

  testPathIgnorePatterns: ['<rootDir>/node_modules/'],

  unmockedModulePathPatterns: [
    'node_modules/react/',
    'node_modules/react-dom/',
  ],

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
};
