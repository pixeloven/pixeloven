import exampleSaga from "@shared/store/Example/sagas";
import { all } from "redux-saga/effects";

/**
 * Single entry point to start all sagas at once
 */
export function* rootSaga() {
    yield all([exampleSaga()]);
}
