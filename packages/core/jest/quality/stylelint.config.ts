import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    runner: "jest-runner-stylelint",
    displayName: "lint:less",
    rootDir: "../../src",
    moduleFileExtensions: ["less"],
    testMatch: ["<rootDir>/**/*.less"]
};

export {
    config as default,
}
