import example from "@shared/store/Example/Example.reducers";
import { combineReducers } from "redux";

/**
 * Register all reducers here
 */
export const rootReducer = combineReducers({
    example,
});
