import Context from "./context";
import { Link, PlainLink, Row, WikiLink } from "./test-model";

describe("ES module", () => {
    const ctx = new Context();

    ctx.add(Row, r => [r.label, r.children]);
    ctx.add(PlainLink, x => [x.label, x.url, x.children])
    ctx.add(Link, x => [x.label, x.url, x.color, x.children])
    ctx.add(WikiLink, x => [x.label, x.url, x.children])

    const sample = new Row("row:label", [
        new WikiLink("wiki", "wikiurl"),
        new PlainLink("link", "linkurl"),
        new Link("link", "linkurl", "#dddddd"),
    ]);

    it("Serializes sample object well enough", () => {
        const str = ctx.serialize(sample);
        const inst2 = new Function('Row', 'PlainLink', 'Link', 'WikiLink', 'return ' + str)(Row, PlainLink, Link, WikiLink);

        expect(str).toMatchSnapshot();
        expect(ctx.serialize(inst2)).toEqual(str);
    });

    it("Deserializes string", () => {
        const str = 'new WikiLink("wiki", "wikiurl", [])';
        const tmp = ctx.deserialize(str);

        expect(tmp).toMatchSnapshot();
    });

    it("support serde of primitive types", () => {
        expect(ctx.serialize("[[],[[]],[]]")).toEqual('"[[],[[]],[]]"');
        expect(ctx.serialize({ a: "1", b: 2 })).toEqual('{"a":"1","b":2}');

        expect(ctx.deserialize('({"a":"1","b":2})')).toEqual({ a: "1", b: 2 });
        expect(ctx.deserialize('[[],[[]],[[[],[]]]]')).toEqual([[], [[]], [[[], []]]]);
    });

    it("properly sandbox other than JS environments", () => {
        expect(() => ctx.deserialize("process.platform")).toThrowError('process is not defined');
        expect(() => ctx.deserialize("process")).toThrowError('process is not defined');
        expect(() => ctx.deserialize("parseFloat")).not.toThrow();
        expect(() => ctx.deserialize("path")).toThrowError('path is not defined');
    });
});
