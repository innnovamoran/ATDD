module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "test/.*\\.(ts)$",
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
