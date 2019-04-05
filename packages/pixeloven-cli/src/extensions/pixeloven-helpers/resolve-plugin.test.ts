import fs from "fs";
import { filesystem } from "gluegun";
import "jest";
import sinon from "sinon";
import resolvePlugin from "./resolve-plugin";

const sandbox = sinon.createSandbox();

const mockExists = sandbox.stub(fs, "existsSync");
const mockRealPath = sandbox.stub(fs, "realpathSync");
const mockPath = sandbox.stub(filesystem, "path");

const nodeModulesPath = "/path/to/node_modules/";
const moduleName = "testing";
const fullPath = `${nodeModulesPath}${moduleName}`;

describe("@pixeloven/cli", () => {
    describe("extensions/pixeloven-helpers", () => {
        describe("resolve-plugin", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            beforeEach(() => {
                mockPath.returns(fullPath);
            });
            it("should not resolve plugin", () => {
                mockExists.returns(false);
                const path = resolvePlugin(moduleName);
                expect(path).toEqual(false);
                expect(mockExists.called).toEqual(true);
                expect(mockPath.calledOnce).toEqual(true);
            });
            it("should resolve plugin", () => {
                mockExists.returns(true);
                const path = resolvePlugin(moduleName);
                expect(path).toEqual(fullPath);
                expect(mockExists.calledOnce).toEqual(true);
                expect(mockPath.calledTwice).toEqual(true);
                expect(mockRealPath.called).toEqual(true);
            });
        });
    });
});
