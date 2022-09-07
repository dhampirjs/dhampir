import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    rootDir: '../',
    projects: [
        '<rootDir>jest/components/all.config.ts'
    ]
}

export {
    config as default,
}
