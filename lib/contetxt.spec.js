"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const test_model_1 = require("./test-model");
describe("ES module", () => {
    const ctx = new context_1.default();
    ctx.add(test_model_1.Row, r => [r.label, r.children]);
    ctx.add(test_model_1.PlainLink, x => [x.label, x.url, x.children]);
    ctx.add(test_model_1.Link, x => [x.label, x.url, x.color, x.children]);
    ctx.add(test_model_1.WikiLink, x => [x.label, x.url, x.children]);
    const sample = new test_model_1.Row("row:label", [
        new test_model_1.WikiLink("wiki", "wikiurl"),
        new test_model_1.PlainLink("link", "linkurl"),
        new test_model_1.Link("link", "linkurl", "#dddddd"),
    ]);
    it("Serializes sample object well enough", () => {
        const str = ctx.serialize(sample);
        const inst2 = new Function('Row', 'PlainLink', 'Link', 'WikiLink', 'return ' + str)(test_model_1.Row, test_model_1.PlainLink, test_model_1.Link, test_model_1.WikiLink);
        expect(str).toMatchSnapshot();
        expect(ctx.serialize(inst2)).toEqual(str);
    });
    it("Deserializes string", () => {
        const str = 'new WikiLink("wiki", "wikiurl", [])';
        const tmp = ctx.deserialize(str);
        expect(tmp).toMatchSnapshot();
    });
});
