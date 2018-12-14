import { ExampleSuccessResponse } from "@shared/store/Example/Example.types";
import { Action, ErrorResponse } from "@shared/store/types";

/**
 * Add new actions here.
 * @description Out of the box we provide three standard actions but others may be added.
 * _FAILURE = when an actions fails
 * _IN_PROGRESS = often associated with when an action is in progress (E.I. Loading)
 * _SUCCESS = when an actions is successful
 */
enum TypeKeys {
    GET_EXAMPLE_FAILURE = "GET_EXAMPLE_FAILURE",
    GET_EXAMPLE_IN_PROGRESS = "GET_EXAMPLE_IN_PROGRESS",
    GET_EXAMPLE_SUCCESS = "GET_EXAMPLE_SUCCESS",
}

export type GetExampleSuccess = Action<
    TypeKeys.GET_EXAMPLE_SUCCESS,
    ExampleSuccessResponse
>;
export type GetExampleFailure = Action<
    TypeKeys.GET_EXAMPLE_FAILURE,
    ErrorResponse
>;
export type GetExampleInProgress = Action<
    TypeKeys.GET_EXAMPLE_IN_PROGRESS,
    string
>;

export type ExampleAction =
    | GetExampleSuccess
    | GetExampleFailure
    | GetExampleInProgress;

export default TypeKeys;
