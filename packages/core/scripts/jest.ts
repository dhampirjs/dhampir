import {run} from 'jest-cli';
import {configuration} from '../configuration';

(async () => {
    const {jest} = configuration;
    try {
        await run([], jest.configFile);
    } catch (e: any) {
        console.log(`Unit tests have failed. Error is ${e.message}`);
    }
})()
