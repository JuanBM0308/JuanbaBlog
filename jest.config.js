module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|scss|html)$': '<rootDir>/src/jest-mocks/file-mock.js',
  },
};
