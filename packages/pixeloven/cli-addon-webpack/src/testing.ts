import "jest";

/**
 * @todo This might need to be it's own module so we can use in the addons
 * @todo Need to figure out how to make this work with addons
 */
import { build, filesystem } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

export const cli = build().brand("pixeloven").src(resolve(__dirname)).create();

export const Sandbox = sinon.createSandbox();

export const Stub = {
    filesystem: Sandbox.stub(filesystem),
};
