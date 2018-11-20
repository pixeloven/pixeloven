import { delay } from "redux-saga";
import { all, put, takeEvery } from "redux-saga/effects";

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
    yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// single entry point to start all sagas at once
export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        // add more sagas here
    ]);
}
