import "jest";
import sinon from "sinon";

import * as main from "./main";

const sandbox = sinon.createSandbox();

const mainSpy = sandbox.mock(main);

const caller = () => {
    require("./index");
};

describe("@pixeloven/cli", () => {
    describe("index", () => {
        afterAll(() => {
            sandbox.restore();
        });
        afterEach(() => {
            sandbox.reset();
        });
        it("should execute main and succeed", () => {
            mainSpy.expects("default").once();
            caller();
            mainSpy.verify();
        });
    });
});

// import "jest";

// import { system } from "gluegun";
// import { resolve } from "path"

// const src = resolve(__dirname)

// const cli = async (cmd: string) =>
//   system.run('node ' + resolve(src, "bin", 'pixeloven') + ` ${cmd}`)

// describe("@pixeloven/cli", () => {
//     describe("index", () => {
//         afterAll(() => {
//             jest.clearAllMocks();
//             jest.restoreAllMocks();
//         });
//         it("should return cli version", async () => {
//             const output = await cli('--version')
//             expect(output).toContain('0.0.1')
//         });
//     });
// });
