module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js}"
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js}",
    "<rootDir>/src/**/?(*.)(test).{js}"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|scss)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
