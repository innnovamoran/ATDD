module.exports = {
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
};
