import { Action, WithMetaData } from "@shared/store/types";

export interface Example {
    title: string;
    description: string;
}

export interface ExampleState extends WithMetaData {
    example: Example;
}

interface ExampleResponse {
    description: string;
    title: string;
}

/**
 * Add new actions here.
 * @description Out of the box we provide three standard actions but others may be added.
 * _FAILURE = when an actions fails
 * _IN_PROGRESS = often associated with when an action is in progress (E.I. Loading)
 * _SUCCESS = when an actions is successful
 */
export enum ExampleActionTypes {
    GET_EXAMPLE_FAILURE = "GET_EXAMPLE_FAILURE",
    GET_EXAMPLE_IN_PROGRESS = "GET_EXAMPLE_IN_PROGRESS",
    GET_EXAMPLE_SUCCESS = "GET_EXAMPLE_SUCCESS",
}

export type GetExampleSuccess = Action<
    ExampleActionTypes.GET_EXAMPLE_SUCCESS,
    ExampleResponse
>;
export type GetExampleFailure = Action<
    ExampleActionTypes.GET_EXAMPLE_FAILURE,
    string
>;
export type GetExampleInProgress = Action<
    ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS,
    string
>;

export type ExampleAction =
    | GetExampleSuccess
    | GetExampleFailure
    | GetExampleInProgress;
