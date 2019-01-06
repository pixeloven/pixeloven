import "jest";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import ExampleActionTypes from "./Example.actions";
import rootSaga, { workExample } from "./Example.sagas";
import { getExample } from "./Example.service";

const mockHttpResponse = {
    data: {
        example: {
            description: "testing",
            title: "testing",
        },
    },
};

describe("Shared/Store/Example", () => {
    describe("Example.sagas", () => {
        describe("rootSaga", () => {
            it('should "yield" all effect', () => {
                const root = rootSaga();
                const allEffect = root.next().value;
                expect(allEffect).toBeDefined();
            });
        });
        describe("workExample", () => {
            it('should "yield" call and put', () => {
                const action = {
                    payload: "test-url",
                    type: ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS,
                };

                return expectSaga(workExample, action)
                    .provide([
                        [call(getExample, action.payload), mockHttpResponse],
                    ])
                    .put({
                        payload: mockHttpResponse.data,
                        type: ExampleActionTypes.GET_EXAMPLE_SUCCESS,
                    })
                    .run();
            });
        });
    });
});
