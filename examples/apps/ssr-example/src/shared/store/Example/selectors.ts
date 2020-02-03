import { createSelector } from "reselect";
import { ExampleState } from "./types";

const getExampleState = (state: ExampleState) => state.example;

const makeGetExampleTitle = () =>
    createSelector([getExampleState], example => example.title);

const makeGetExampleDescription = () =>
    createSelector([getExampleState], example => example.description);

export { getExampleState, makeGetExampleTitle, makeGetExampleDescription };
