/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Tells Jest to look for tests in the src folder
  roots: ["<rootDir>/src"],
  // Matches any file ending in .test.ts or .spec.ts
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
