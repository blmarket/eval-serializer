import { toString, decorate } from "./deco";
import * as ES from "./deco";

interface Elem {
}

class Row implements Elem {
    type: string;
    label: string;
    children: Elem[];

    constructor(label, children = []) {
        this.type = "Row";
        this.label = label;
        this.children = children;
    }
}

class Link implements Elem {
    type: string;
    label: string;
    url: string;
    color: string;
    children: Elem[];

    constructor(label, url, color, children = []) {
        this.type = "Link";
        this.label = label;
        this.url = url;
        this.color = color;
        this.children = children;
    }
}

class PlainLink extends Link {
    constructor(label, url, children = []) {
        super(label, url, '#ffffff', children);
    }
}

const WIKI_COLOR = "#e3f2fd";

class WikiLink extends Link {
    constructor(label, url, children = []) {
        super(label, url, WIKI_COLOR, children);
    }
}

const sample = new Row("row:label", [
    new WikiLink("wiki", "wikiurl"),
    new PlainLink("link", "linkurl"),
    new Link("link", "linkurl", "#dddddd"),
]);

describe("ES module", () => {
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

