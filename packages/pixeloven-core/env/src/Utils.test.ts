import "jest";
import { Mode, Name, Target } from "./types";
import { getUtils } from "./Utils";

describe("@pixeloven/env", () => {
    describe("Utils", () => {
        describe("getUtils", () => {
            it("should return an object full of functions", () => {
                const utils = getUtils({
                    mode: Mode.development,
                    name: Name.client,
                    target: Target.web,
                });
                expect(typeof utils).toEqual("object");
                for (const key in utils) {
                    if (utils.hasOwnProperty(key)) {
                        expect(typeof utils[key]).toEqual("function");
                    }
                }
            });
            describe("ifClient", () => {
                describe("when name is client", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.client,
                        target: Target.web,
                    });
                    it("should return true with zero arguments", () => {
                        const { ifClient } = utils;
                        expect(ifClient()).toEqual(true);
                    });
                    it("should return first argument with one argument", () => {
                        const { ifClient } = utils;
                        expect(ifClient("first")).toEqual("first");
                    });
                    it("should return first argument with two arguments", () => {
                        const { ifClient } = utils;
                        expect(ifClient("first", "server")).toEqual("first");
                    });
                });
                describe("when name is not client", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.server,
                        target: Target.web,
                    });
                    it("should return false with zero arguments", () => {
                        const { ifClient } = utils;
                        expect(ifClient()).toEqual(false);
                    });
                    it("should return false with one argument", () => {
                        const { ifClient } = utils;
                        expect(ifClient("first")).toEqual(false);
                    });
                    it("should return second argument with two arguments", () => {
                        const { ifClient } = utils;
                        expect(ifClient("first", "second")).toEqual("second");
                    });
                });
            });
            describe("ifNotClient", () => {
                describe("when name is client", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.client,
                        target: Target.web,
                    });
                    it("should return false with zero arguments", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient()).toEqual(false);
                    });
                    it("should return false with one argument", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient("first")).toEqual(false);
                    });
                    it("should return second argument with two arguments", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient("first", "second")).toEqual(
                            "second",
                        );
                    });
                });
                describe("when name is not client", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.server,
                        target: Target.web,
                    });
                    it("should return true with zero arguments", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient()).toEqual(true);
                    });
                    it("should return first argument with one argument", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient("first")).toEqual("first");
                    });
                    it("should return first argument with two arguments", () => {
                        const { ifNotClient } = utils;
                        expect(ifNotClient("first", "second")).toEqual("first");
                    });
                });
            });
            describe("ifLibrary", () => {
                describe("when name is library", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.library,
                        target: Target.node,
                    });
                    it("should return true with zero arguments", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary()).toEqual(true);
                    });
                    it("should return first argument with one argument", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary("library")).toEqual("library");
                    });
                    it("should return first argument with two arguments", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary("library", "nothing")).toEqual(
                            "library",
                        );
                    });
                });
                describe("when name is not library", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.server,
                        target: Target.node,
                    });
                    it("should return false with zero arguments", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary()).toEqual(false);
                    });
                    it("should return false with one argument", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary("library")).toEqual(false);
                    });
                    it("should return second argument with two arguments", () => {
                        const { ifLibrary } = utils;
                        expect(ifLibrary("library", "nothing")).toEqual(
                            "nothing",
                        );
                    });
                });
            });
            describe("ifServer", () => {
                describe("when name is server", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.server,
                        target: Target.node,
                    });
                    it("should return true with zero arguments", () => {
                        const { ifServer } = utils;
                        expect(ifServer()).toEqual(true);
                    });
                    it("should return first argument with one argument", () => {
                        const { ifServer } = utils;
                        expect(ifServer("server")).toEqual("server");
                    });
                    it("should return first argument with two arguments", () => {
                        const { ifServer } = utils;
                        expect(ifServer("server", "client")).toEqual("server");
                    });
                });
                describe("when name is not server", () => {
                    const utils = getUtils({
                        mode: Mode.development,
                        name: Name.library,
                        target: Target.node,
                    });
                    it("should return false with zero arguments", () => {
                        const { ifServer } = utils;
                        expect(ifServer()).toEqual(false);
                    });
                    it("should return false with one argument", () => {
                        const { ifServer } = utils;
                        expect(ifServer("server")).toEqual(false);
                    });
                    it("should return second argument with two arguments", () => {
                        const { ifServer } = utils;
                        expect(ifServer("server", "client")).toEqual("client");
                    });
                });
            });
        });
    });
});
