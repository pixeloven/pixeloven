import ExampleActionTypes, { ExampleAction } from "@shared/store/Example/Example.actions";
import { ExampleState } from "@shared/store/Example/Example.types";
import produce from "immer";

const initialState: ExampleState = {
    example: {
        description: "",
        id: 0,
        title: "",
    }
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
            draft.meta.error = action.payload.error;
            draft.meta.loading = false;
            return draft;
    }
};

export default produce<ExampleState, ExampleAction>(exampleReducer, initialState);
