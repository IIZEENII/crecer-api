import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  transform: {
    '^.+\\.(t|j)s$': ['@swc/jest', { configFile: '.swcrc' }],
  },
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  rootDir: './test',
  clearMocks: true,
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
export default config;