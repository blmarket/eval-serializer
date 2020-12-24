"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ES = require("./deco");
const test_model_1 = require("./test-model");
describe("ES module", () => {
    const sample = new test_model_1.Row("row:label", [
        new test_model_1.WikiLink("wiki", "wikiurl"),
        new test_model_1.PlainLink("link", "linkurl"),
        new test_model_1.Link("link", "linkurl", "#dddddd"),
    ]);
    ES.decorate(test_model_1.Row, r => [r.label, r.children]);
    ES.decorate(test_model_1.PlainLink, x => [x.label, x.url, x.children]);
    ES.decorate(test_model_1.Link, x => [x.label, x.url, x.color, x.children]);
    ES.decorate(test_model_1.WikiLink, x => [x.label, x.url, x.children]);
    it("Serializes sample object well enough", () => {
        const str = ES.toString(sample);
        const inst2 = new Function('Row', 'PlainLink', 'Link', 'WikiLink', 'return ' + str)(test_model_1.Row, test_model_1.PlainLink, test_model_1.Link, test_model_1.WikiLink);
        expect(ES.toString(inst2)).toEqual(str);
    });
});
