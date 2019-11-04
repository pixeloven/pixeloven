import produce from "immer";
import { ExampleAction, ExampleActionTypes, ExampleState } from "./types";

export const initialState: ExampleState = {
    example: {
        description: "",
        title: "",
    },
    meta: {
        error: false,
        initialized: false,
        loading: false,
    },
};

/**
 * Example Reducer
 * @param state
 * @param action
 */
const exampleReducer = (draft: ExampleState, action: ExampleAction) => {
    switch (action.type) {
        case ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS:
            draft.meta.error = false;
            draft.meta.loading = false;
            return draft;
        case ExampleActionTypes.GET_EXAMPLE_SUCCESS:
            draft.meta.error = false;
            draft.meta.loading = false;
            return {
                ...draft,
                ...action.payload,
            };
        case ExampleActionTypes.GET_EXAMPLE_FAILURE:
            draft.meta.error = true;
            draft.meta.loading = false;
            return draft;
    }
};

export default produce<ExampleState, ExampleAction>(
    exampleReducer,
    initialState,
);
