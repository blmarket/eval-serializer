"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idx = require("./index");
describe("index", () => {
    it("should export members", () => {
        expect(idx.Context).toBeDefined();
        expect(idx.decorate).toBeDefined();
        expect(idx.toString).toBeDefined();
    });
});
