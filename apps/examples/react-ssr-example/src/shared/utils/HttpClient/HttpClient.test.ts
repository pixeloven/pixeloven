import "jest";
import { HttpClient, Response } from "./HttpClient";

jest.mock("axios");

describe("Shared/Utils", () => {
    describe("HttpClient", () => {
        describe("get", () => {
            it(`should make GET request and respond with "testing"`, done => {
                HttpClient.get("/testing")
                    .then((response: Response) => {
                        expect(response).toEqual("testing");
                        done();
                    })
                    .catch((error: Error) => {
                        done(error);
                    });
            });
        });
        describe("post", () => {
            it(`should make POST request and respond with "testing"`, done => {
                HttpClient.post("/testing", {
                    testing: "working",
                })
                    .then((response: Response) => {
                        expect(response).toEqual("testing");
                        done();
                    })
                    .catch((error: Error) => {
                        done(error);
                    });
            });
        });
    });
});
