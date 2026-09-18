import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
    // @ts-expect-error - Node's TextDecoder and the DOM lib's TextDecoder types differ slightly
    global.TextDecoder = TextDecoder;
}
