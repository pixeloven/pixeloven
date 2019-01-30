import fs from "fs";
import "jest";
import sinon, { SinonSandbox } from "sinon";
import { AssetManifest } from "./AssetManifest";

describe("Server/Utils/AssetManifest", () => {
    describe("manifest", () => {
        let sandbox: SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });
        it("should use default fileName and return undefined", () => {
            sandbox.stub(fs, "existsSync").returns(false);
            const asset = new AssetManifest();
            expect(asset.manifest).toEqual(undefined);
        });
        it("should use default fileName and return Manifest", () => {
            const manifest = `{"file.js":"/file.js", "file.css":"/file.css"}`;
            sandbox.stub(fs, "existsSync").returns(true);
            sandbox.stub(fs, "readFileSync").returns(manifest);
            const asset = new AssetManifest();
            expect(typeof asset.manifest).toEqual("object");
            expect(asset.manifest).toHaveProperty("css");
            expect(asset.manifest).toHaveProperty("js");
        });
        /**
         * @todo CA-352 can't test this unless we have a way to mock out our entire state
         */
        // it("should use webpack stats object and return Manifest", () => {
        //     const asset = new AssetManifest({
        //         stats: {}
        //     });
        //     expect(typeof asset.manifest).toEqual("object");
        //     expect(asset.manifest).toHaveProperty("css");
        //     expect(asset.manifest).toHaveProperty("js");
        // });
    });
});
