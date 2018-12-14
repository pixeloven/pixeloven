describe("@pixeloven/generators", () => {
    describe("plopfile", () => {
        it("should export module", () => {
            expect(typeof require("./plopfile")).toEqual("function");
        });
    });
});
