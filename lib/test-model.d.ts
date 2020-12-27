interface Elem {
}
declare class Row implements Elem {
    type: string;
    label: string;
    children: Elem[];
    constructor(label: string, children?: Elem[]);
}
declare class Link implements Elem {
    type: string;
    label: string;
    url: string;
    color: string;
    children: Elem[];
    constructor(label: string, url: string, color: string, children?: Elem[]);
}
declare class PlainLink extends Link {
    constructor(label: string, url: string, children?: Elem[]);
}
declare class WikiLink extends Link {
    constructor(label: string, url: string, children?: Elem[]);
}
export { Row, WikiLink, PlainLink, Link };
