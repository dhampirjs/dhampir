import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    runner: "eslint",
    displayName: "lint:typescript",
    rootDir: "../../src",
    moduleFileExtensions: ["ts", "tsx"],
    testMatch: [
        "<rootDir>/core/**/*.{ts,tsx}",
        "<rootDir>/extensions/**/*.{ts,tsx}"
    ],
}

export {
    config as default,
}
