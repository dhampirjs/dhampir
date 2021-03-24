import { not, is, type, Functor, tap, concat, __, complement, when, compose, construct, always } from 'ramda';

type IOInput<T> = () => T;

class IO<T, U> implements Functor<T> {
    value: IOInput<T>;

    constructor(fn: IOInput<T>) {
        this.value = fn;

        if (not(is(Function, fn))) {
            throw new Error(`IO expects function as an input, actual: ${type(fn)}`);
        }
    }

    map<V>(fn: (v: T) => V) {
        const value = this.value();
        return new IO(() => fn(this.value()))
    }

    run() {
        this.value();
    }

    static of(fn: any) {
        return compose(
            construct(IO),
            when(
                complement(is(Function)),
                always(() => fn),
            )
        )(fn);
    }
}

export {
    IO,
}

