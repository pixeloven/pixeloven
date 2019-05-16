import "jest";

import { build, filesystem, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

export const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname))
    .create();

export const Sandbox = sinon.createSandbox();

export const Mock = {
    filesystem: Sandbox.mock(filesystem),
    print: Sandbox.mock(print),
};
