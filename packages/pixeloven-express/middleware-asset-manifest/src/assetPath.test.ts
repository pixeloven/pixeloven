import express, { Request } from "express";
import fs from "fs";
import "jest";
import sinon from "sinon";
import request from "supertest";
import assetPath from "./assetPath";

const sandbox = sinon.createSandbox();
const json = JSON.stringify({
    "file.css": "/file.css",
    "file.js": "/file.js",
});
const existsSyncStub = sandbox.stub(fs, "existsSync").returns(false);

describe("Server/Middleware", () => {
    describe("assetPath", () => {
        afterAll(() => {
            sandbox.restore();
        });
        afterEach(() => {
            sandbox.reset();
        });
        it(`should create default middleware without files`, done => {
            existsSyncStub.returns(false);
            let testReq: Request;
            const handler = assetPath("/", "asset-manifest.json");
            const app = express();
            app.use(handler);
            app.use((req, res) => {
                testReq = req;
                res.sendStatus(200);
            });
            request(app)
                .get("/testing")
                .send()
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(testReq.files).toEqual({
                        css: [],
                        js: [],
                    });
                    done();
                });
        });
        it(`should create middleware with files`, done => {
            existsSyncStub.returns(true);
            sandbox.stub(fs, "readFileSync").returns(json);
            let testReq: Request;
            const handler = assetPath("/", "asset-manifest.json");
            const app = express();
            app.use(handler);
            app.use((req, res) => {
                testReq = req;
                res.sendStatus(200);
            });
            request(app)
                .get("/testing")
                .send()
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(testReq.files).toEqual({
                        css: ["/file.css"],
                        js: ["/file.js"],
                    });
                    done();
                });
        });
    });
});
