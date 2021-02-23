import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    runner: "jest-runner",
    displayName: "test:unit",
    rootDir: "../..",
    verbose: true,
    notify: true,
    bail: false,
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/app.tsx",
        "<rootDir>/src/extensions/explorer/**/*.{ts,tsx}",
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/build/",
        "<rootDir>/coverage/",
        "<rootDir>/dist/",
        "<rootDir>/src/index.tsx",
        "<rootDir>/src/index.dev.tsx",
    ],
    coverageThreshold: {
        "global": {
            "branches": 1,
            "functions": 1,
            "lines": 1,
            "statements": 1
        }
    },
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    moduleFileExtensions: ["js", "json", "less", "ts", "tsx"],
    setupFiles: ["<rootDir>/jest/scripts/setupFiles.ts"],
    setupFilesAfterEnv: [
        "<rootDir>/jest/scripts/configureEnzyme.ts"
    ],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleNameMapper: {
        "\\.(less|m.less)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js"
    },
    testURL: "http://www.test.com",
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/build/",
        "<rootDir>/coverage/",
        "<rootDir>/dist/",
        "<rootDir>/src/index.tsx",
        "<rootDir>/src/index.dev.tsx",
    ],
}


export {
    config as default,
}
