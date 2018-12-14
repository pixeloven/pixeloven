import {
    Action,
    applyMiddleware,
    createStore,
    Store as DefaultStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    default as createSagaMiddleware,
    END,
    SagaMiddleware,
} from "redux-saga";
import { rootReducer, rootSaga } from "./";

export interface Store extends DefaultStore {
    runSaga: SagaMiddleware<{}>["run"];
    close: () => Action;
}

/**
 * Setup store and saga middleware
 * @todo: CA-114 refactor configureStore() with webpack
 */
export const configureStore = (clientSide: boolean): Store => {
    const initialState =
        clientSide && window.INIT_STATE ? window.INIT_STATE : {};

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
            // other store enhancers if any
        ),
    ) as Store;

    if (clientSide) {
        sagaMiddleware.run(rootSaga);
    } else {
        store.runSaga = sagaMiddleware.run;
        store.close = () => store.dispatch(END);
    }

    return store;
};
