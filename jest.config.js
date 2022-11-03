module.exports = {
  testRegex: "test/.*\\.(ts)$",
  testPathIgnorePatterns: [
    "__mocks__.*\\.(ts)$",
    "test/mock/.*\\.(ts)$",
    "test/utils/.*\\.(ts)$",
    "/node_modules/",
    "/coverage/",
    "/build/",
  ],
};
