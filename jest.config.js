const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "test/.*\\.(ts)$",
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  testPathIgnorePatterns: [
    "__mocks__.*\\.(ts)$",
    "test/mock/.*\\.(ts)$",
    "test/Utils/.*\\.(ts)$",
    "/node_modules/",
    "/coverage/",
    "/build/",
  ],
  verbose: true,
  bail: 1,
};
