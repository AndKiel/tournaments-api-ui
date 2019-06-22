module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!<rootDir>/src/**/*.test.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html"],
  testMatch: [
    "<rootDir>/src/**/*.test.js"
  ],
  testEnvironment: "jest-environment-jsdom-fourteen",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "^(?!.*\\.(js|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    "^.+\\.module\\.scss$"
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [
    "js",
    "json"
  ],
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
