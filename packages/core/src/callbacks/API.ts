export type ScopeCallback = () => void;
export interface CallbackRegistry {
    [scopeId: string]: ScopeCallback[],
}

export enum CallbackScope {
    STORE = "store",
}
