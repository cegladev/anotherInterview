module.exports = {
  reporters: ['default'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/?(*.)+(spec|test).ts|**/__tests__/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts']
};
