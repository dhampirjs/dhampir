import {
    compose,
    curry,
    prepend,
    reduce,
    tap,
} from "ramda";

const apply = curry(compose.apply);
const trace = tap(console.log.bind(console));


const traceCompose = compose(
    apply(compose),
    prepend(trace),
    reduce((acc: any, fn: any) => [].concat(acc, fn, trace as any), []),
    Array
);

export {
    traceCompose,
}

