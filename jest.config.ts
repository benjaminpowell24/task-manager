import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts?(x)`],
  testMatch: [`${baseDir}/**/__tests__/*.ts?(x)`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}

export default config
