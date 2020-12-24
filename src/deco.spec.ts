import * as ES from "./deco";
import {Link, PlainLink, Row, WikiLink} from "./test-model";

describe("ES module", () => {
    const sample = new Row("row:label", [
        new WikiLink("wiki", "wikiurl"),
        new PlainLink("link", "linkurl"),
        new Link("link", "linkurl", "#dddddd"),
    ]);

    ES.decorate(Row, r => [ r.label, r.children ]);
    ES.decorate(PlainLink, x => [ x.label, x.url, x.children ])
    ES.decorate(Link, x => [ x.label, x.url, x.color, x.children ])
    ES.decorate(WikiLink, x => [ x.label, x.url, x.children ])

    it("Serializes sample object well enough", () => {
        const str = ES.toString(sample);
        const inst2 = new Function('Row', 'PlainLink', 'Link', 'WikiLink', 'return ' + str)(Row, PlainLink, Link, WikiLink);
        expect(ES.toString(inst2)).toEqual(str);
    });
});

