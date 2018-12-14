/**
 * Types for API/Service integration
 * @todo Should make this it's own module
 */
export interface ServiceError {
    code: number;
    message: string;
}

export type ResponseTypes = object | string | number | undefined;

export interface SuccessResponse {
    [key: string]: ResponseTypes | ResponseTypes[];
}

export interface ErrorResponse {
    error: ServiceError;
}

export type Response = SuccessResponse | ErrorResponse;

/**
 * Types for Redux Actions
 * @todo Should make this it's own module
 */
export type Type<T extends string> = T;
export type Payload<T extends Response | string | number | undefined> = T;

export interface Action<
    T extends string,
    K extends Payload<Response | string | number | undefined>
> {
    type: Type<T>;
    payload: Payload<K>;
}

/**
 * Types for Redux reducers
 * @todo Should make this it's own module
 */
export interface MetaData {
    initialized: boolean;
    loading: boolean;
    error?: ServiceError | false | undefined;
}

export interface State {
    meta: MetaData;
}
