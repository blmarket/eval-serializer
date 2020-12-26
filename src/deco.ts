const TOSTR_KEY = "__EVAL_SERIALIZER_TOSTR_KEY__";
const UNAPPLY_KEY = "__EVAL_SERIALIZER_UNAPPLY_KEY__";

function toString(obj: any, indent: number = 0, inline: boolean = false): string {
    if (obj === null) {
        return "null";
    }

    if (Array.isArray(obj)) {
        if (obj.length == 0) {
            return " ".repeat(inline ? 0 : indent) + "[]";
        }
        return " ".repeat(inline ? 0 : indent) + "[\n" + obj.map(jt => toString(jt, indent + 2)).join(",\n") + " ]";
    }

    const Class = Object.getPrototypeOf(obj);
    const toStr = Class[TOSTR_KEY];
    if (!toStr) {
        return " ".repeat(inline ? 0 : indent) + JSON.stringify(obj);
    }

    return toStr.call(obj, indent, inline);
}

function decorate<T>(Class: Function, unapply: (T) => any[]): Function {
    console.warn("Decoration API is no longer supported, use context api instead");
    Class.prototype[UNAPPLY_KEY] = unapply;
    Class.prototype[TOSTR_KEY] = function (indent, inline = false) {
        return " ".repeat(inline ? 0 : indent) + `new ${Class.name}(${unapply(this).map(it => {
            return toString(it, indent, true);
        }).join(", ")})`;
    }
    return Class;
}

export { toString, decorate };
