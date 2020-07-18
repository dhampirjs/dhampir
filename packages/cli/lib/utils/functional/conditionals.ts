import { Identity } from "./combinators";

type OrFunc<T, U, V> = (v: T) => U | V
type Condition<T> = (v: T) => boolean
type Operation<T, U> = (v: T) => U

const conditionals = <T, U, V>(left: OrFunc<T, U, V>, right: OrFunc<T, U, V>) => (v: T) => left(v) || right(v);

const ifElse = <T, U , V>(is: (v: T) => boolean, truly: (v: T) => U, falsy: (v: T) => V) => (v: T) => {
    return is(v) ? truly(v) : falsy(v);
};

const when = <T, U>(is: (v: T) => boolean, then: (v: T) => U) => ifElse(is, then, Identity);

const conditions = <T, U>(pairs: Array<Array<Condition<T> | Operation<T, U>>>) => {
    return (v: T): any => {
        const [[clause, action], ...rest] = pairs;
        return clause(v) ? action(v) : conditions(rest)(v);
    }
}

export {
    conditionals,
    ifElse,
    when,
    conditions,
}

