import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import express from "express";
import "jest";
import { Helmet } from "react-helmet";
import request from "supertest";
import server from "./server";

configure({
    adapter: new ReactSixteenAdapter(),
});

jest.mock("axios");

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

describe("Server", () => {
    describe("server", () => {
        const app = express();
        server(app);
        const running = app.listen(getRandomInt(8080, 48080), "localhost");

        beforeEach(() => {
            Helmet.canUseDOM = false;
        });
        afterEach(() => {
            Helmet.canUseDOM = true;
        });
        afterAll(() => {
            running.close();
        });
        it(`responds to "/v1/health" with 200 and render "OK"`, done => {
            request(app)
                .get("/v1/health")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).toEqual("OK");
                    done();
                });
        });
        it(`responds to "/" with 200 and render <App />`, done => {
            request(app)
                .get("/")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).toContain("<!DOCTYPE html>");
                    done();
                });
        });
    });
});
