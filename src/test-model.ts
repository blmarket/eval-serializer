// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Elem {
}

class Row implements Elem {
    type: string;
    label: string;
    children: Elem[];

    constructor(label: string, children: Elem[] = []) {
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

    constructor(label: string, url: string, color: string, children: Elem[] = []) {
        this.type = "Link";
        this.label = label;
        this.url = url;
        this.color = color;
        this.children = children;
    }
}

class PlainLink extends Link {
    constructor(label: string, url: string, children: Elem[] = []) {
        super(label, url, '#ffffff', children);
    }
}

const WIKI_COLOR = "#e3f2fd";

class WikiLink extends Link {
    constructor(label: string, url: string, children: Elem[] = []) {
        super(label, url, WIKI_COLOR, children);
    }
}

export { Row, WikiLink, PlainLink, Link };
