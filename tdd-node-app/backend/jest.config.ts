// https://kulshekhar.github.io/ts-jest/docs/getting-started/installation
import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  displayName: 'tdd-node-app',
  preset: "ts-jest",
  verbose: true,
  testMatch: [
      "**/?(*)+(test).ts"
  ],
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],
  transform: {
    ...tsjPreset.transform,
  },
};

module.exports = config;