/**
 * Copyright © 2019-present, Pulsar.
 *
 * This source code is licensed under the MIT license. Please, find the
 * LICENSE file in the root directory of this repository.
 */

'use strict';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

console.log("Cleaning...");
