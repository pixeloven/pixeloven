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

type Target = "client" | "server";

export interface Store extends DefaultStore {
    runSaga: SagaMiddleware<{}>["run"];
    close: () => Action;
}

/**
 * Setup store and saga middleware
 * @todo Set locale here
 */
export const configureStore = (target: Target): Store => {
    const initialState =
        target === "client" && window.INIT_STATE ? window.INIT_STATE : {};

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
            // other store enhancers if any
        ),
    ) as Store;

    if (target === "client") {
        sagaMiddleware.run(rootSaga);
    } else {
        store.runSaga = sagaMiddleware.run;
        store.close = () => store.dispatch(END);
    }

    return store;
};
