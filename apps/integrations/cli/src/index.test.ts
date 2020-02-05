import "jest";
import index from "./index"

/**
 * @todo Should we also use all the deps to show off features here?
 */
describe("@pixeloven/integrations", () => {
    it("testing", () => {
        expect(index).toEqual("testing");
    });
});
