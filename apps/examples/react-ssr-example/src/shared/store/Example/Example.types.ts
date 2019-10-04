import { State, SuccessResponse } from "@shared/store/types";

export interface Example {
    title: string;
    description: string;
}

export interface ExampleSuccessResponse extends SuccessResponse {
    example: Example;
}

export interface ExampleState extends State {
    example: Example;
}
