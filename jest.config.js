// @ts-check

/**
 * @type {import("@jest/types").Config.ProjectConfig}
 */

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.svg$": `<rootDir>/__mocks__/svg-mock.ts`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.ts`,
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  rootDir: "./src",
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/", "cypress"],
  transformIgnorePatterns: [`node_modules`],
  globals: {
    __PATH_PREFIX__: ``,
    "ts-jest": {
      tsConfig: "./tsconfig.test.json",
    },
  },
  testURL: `http://localhost`,
};
