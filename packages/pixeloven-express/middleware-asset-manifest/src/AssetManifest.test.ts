import fs from "fs";
import "jest";
import sinon from "sinon";
import { AssetManifest } from "./AssetManifest";

const sandbox = sinon.createSandbox();
const json = JSON.stringify({
    "file.css": "/file.css",
    "file.js": "/file.js",
});
const existsSyncStub = sandbox.stub(fs, "existsSync").returns(false);

describe("Server/Utils/AssetManifest", () => {
    describe("manifest", () => {
        afterAll(() => {
            sandbox.restore();
        });
        afterEach(() => {
            sandbox.reset();
        });
        it("should use default fileName and return undefined", () => {
            existsSyncStub.returns(false);
            const asset = new AssetManifest();
            expect(asset.manifest).toEqual({
                css: [],
                js: [],
            });
        });
        it("should use default fileName and return Manifest", () => {
            existsSyncStub.returns(true);
            sandbox.stub(fs, "readFileSync").returns(json);
            const asset = new AssetManifest();
            expect(asset.manifest).toEqual({
                css: ["/file.css"],
                js: ["/file.js"],
            });
        });
    });
});
