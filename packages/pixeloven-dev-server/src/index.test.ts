import * as cli from "./main";

let testArgv: string[] = [];
const cliMock = (argv: string[]) => {
    testArgv = argv;
};

const caller = () => {
    require("./index");
};

describe("@pixeloven/dev-server", () => {
    describe("index", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
        it("should execute main and succeed", () => {
            const cliSpy = jest
                .spyOn(cli, "default")
                .mockImplementation(cliMock);
            caller();
            expect(cliSpy).toHaveBeenCalledTimes(1);
            expect(testArgv).toEqual(process.argv);
        });
    });
});
