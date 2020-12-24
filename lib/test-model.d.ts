interface Elem {
}
declare class Row implements Elem {
    type: string;
    label: string;
    children: Elem[];
    constructor(label: any, children?: any[]);
}
declare class Link implements Elem {
    type: string;
    label: string;
    url: string;
    color: string;
    children: Elem[];
    constructor(label: any, url: any, color: any, children?: any[]);
}
declare class PlainLink extends Link {
    constructor(label: any, url: any, children?: any[]);
}
declare class WikiLink extends Link {
    constructor(label: any, url: any, children?: any[]);
}
export { Row, WikiLink, PlainLink, Link };
