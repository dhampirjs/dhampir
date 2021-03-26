import { resolve, join }  from "path";
import BUILD_MODES from "./build/common/constants";

export const configuration = {
    mode: process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : BUILD_MODES.PROD, //Production mode is the default
    mountPoint: "application",
    projectDir: resolve(__dirname),
    source: resolve(__dirname, 'src'),
    dist: resolve(__dirname, 'dist'),
    build: resolve(__dirname, 'build'),
    jest: {
        configFile: join(resolve(__dirname), 'jest/jest.config.ts'),
    },
    eslint: {
        configFile: join(resolve(__dirname), '.eslintrc.json'),
        pattern: 'src/**/*.{ts,tsx}',
    },
    filesToCopy: [
        'src/**/*.less',
    ],
    filesToClean: [
        'src/**/*.d.ts',
    ],
    server: {
        host: 'localhost',
        port: 9090
    }
}
