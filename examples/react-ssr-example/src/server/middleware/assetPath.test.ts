import express, { Request } from "express";
import fs from "fs";
import "jest";
import sinon, { SinonSandbox } from "sinon";
import request from "supertest";
import assetPath from "./assetPath";

let sandbox: SinonSandbox;

describe("Server/Middleware", () => {
    describe("assetPath", () => {
        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });
        it(`should create default middleware without files`, done => {
            let testReq: Request;
            const handler = assetPath("/f/", "asset-manifest.json");
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
                    expect(testReq.files).toBeUndefined();
                    done();
                });
        });
        it(`should create middleware with files`, done => {
            let testReq: Request;
            sandbox.stub(fs, "existsSync").returns(true);
            sandbox
                .stub(fs, "readFileSync")
                .returns(`{"file.js":"/file.js", "file.css":"/file.css"}`);
            const handler = assetPath("/f/", "asset-manifest.json");
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
                    expect(testReq.files).toHaveProperty("css");
                    expect(testReq.files).toHaveProperty("js");
                    done();
                });
        });
    });
});
