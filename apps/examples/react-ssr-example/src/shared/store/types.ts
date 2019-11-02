/**
 * Types for Redux Actions
 * @todo Should make this it's own module
 */
export type Type<T extends string> = T;
export type Payload<
    T extends Response | object | string | number | undefined
> = T;

export interface Action<
    T extends string,
    K extends Payload<Response | object | string | number | undefined>
> {
    type: Type<T>;
    payload: Payload<K>;
}

export interface MetaData {
    initialized: boolean;
    loading: boolean;
    error: boolean;
}

export interface WithMetaData {
    meta: MetaData;
}
