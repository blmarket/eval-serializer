import * as idx from "./index";

describe("index", () => {
    it("should export members", () => {
        expect(idx.Context).toBeDefined();
        expect(idx.decorate).toBeDefined();
        expect(idx.toString).toBeDefined();
    });
});
