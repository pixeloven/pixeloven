import { ExampleState } from "@shared/store/Example/Example.types";
import { createSelector } from "reselect";

const getExampleState = (state: ExampleState) => state.example;

const makeGetExampleTitle = () =>
    createSelector(
        [getExampleState],
        example => example.title,
    );

const makeGetExampleDescription = () =>
    createSelector(
        [getExampleState],
        example => example.description,
    );

export {
    getExampleState,
    makeGetExampleTitle,
    makeGetExampleDescription,
};
