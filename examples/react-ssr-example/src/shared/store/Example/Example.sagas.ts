import ExampleActionTypes, {
    GetExampleInProgress,
} from "@shared/store/Example/Example.actions";
import { getExample } from "@shared/store/Example/Example.service";
import { all, call, put, takeEvery } from "redux-saga/effects";

// Workers
function* workExample(action: GetExampleInProgress) {
    try {
        const response = yield call(getExample, action.payload);
        const { data } = response;

        yield put({
            payload: data,
            type: ExampleActionTypes.GET_EXAMPLE_SUCCESS,
        });
    } catch (error) {
        yield put({
            payload: error.response,
            type: ExampleActionTypes.GET_EXAMPLE_FAILURE,
        });
    }
}

// Watchers
function* watchExample() {
    yield takeEvery(ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS, workExample);
}

// Root
function* saga() {
    yield all([watchExample()]);
}

export default saga;
export { workExample };
