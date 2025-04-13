module.exports = {
  roots: ["<rootDir>/src"], // point to your `src` folder
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(test|spec).+(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/flatfileDb/"
  ],
  testEnvironment: "node"
};
