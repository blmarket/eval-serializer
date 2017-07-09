"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Row {
    constructor(label, children = []) {
        this.type = "Row";
        this.label = label;
        this.children = children;
    }
}
exports.Row = Row;
class Link {
    constructor(label, url, color, children = []) {
        this.type = "Link";
        this.label = label;
        this.url = url;
        this.color = color;
        this.children = children;
    }
}
exports.Link = Link;
class PlainLink extends Link {
    constructor(label, url, children = []) {
        super(label, url, '#ffffff', children);
    }
}
exports.PlainLink = PlainLink;
const WIKI_COLOR = "#e3f2fd";
class WikiLink extends Link {
    constructor(label, url, children = []) {
        super(label, url, WIKI_COLOR, children);
    }
}
exports.WikiLink = WikiLink;
const example = new Row("row:label", [
    new WikiLink("wiki", "wikiurl"),
    new PlainLink("link", "linkurl"),
    new Link("link", "linkurl", "#dddddd"),
]);
exports.default = example;
