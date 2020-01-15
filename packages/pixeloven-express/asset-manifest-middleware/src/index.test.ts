import "jest";
import { assetPath } from "./index";

describe("util-asset-manifest", () => {
    describe("index", () => {
        it("exports AssetManifest", () => {
            expect(typeof assetPath).toEqual("function");
        });
    });
});
