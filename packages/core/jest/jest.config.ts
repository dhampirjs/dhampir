import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: "jest-runner-stylelint",
    rootDir: '../',
    projects: [
        '<rootDir>/jest/quality/tslint.config.ts',
        '<rootDir>/jest/extensions/explorer.config.ts'
    ]
}


export {
    config as default,
}
