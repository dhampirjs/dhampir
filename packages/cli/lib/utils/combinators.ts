const Identity = <T>(v: T) => v;

const K = <T, U>(a: T) => {
    return (b: U) => a;
};

/* Flip like combinator */
const C = <T extends Function, U, V>(first: T) => {
    return (a: U) => {
        return (b: V) => {
            return first(b)(a);
        };
    };
};

const B = <T extends Function, U extends Function, V>(first: T) => {
    return (second: U) => {
        return (a: V) => {
            return first(second(a));
        };
    };
};

const T = <T, U extends Function>(a: T) => {
    return (fn: U) => {
        return fn(a);
    };
};

const D = <T extends Function, U, V extends Function, W>(first: T) => {
    return (a: U) => {
        return (second: V) => {
            return (b: W) => {
                return first(a)(second(b));
            };
        };
    };
};

const S = <T extends Function, U extends Function, V>(first: T) => {
    return (second: U) => {
        return (v: V) => {
            return first(v)(second(v));
        };
    };
}

export {
    Identity, K, C, B, T, D, S,
}
