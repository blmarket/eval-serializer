"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor() {
        this.classMap = {};
    }
    add(Class, unapply) {
        this.classMap[Class.name] = [Class, unapply];
    }
    serialize(obj, indent = 0, inline = false) {
        if (obj == null) {
            return "null";
        }
        if (Array.isArray(obj)) {
            if (obj.length == 0) {
                return " ".repeat(inline ? 0 : indent) + "[]";
            }
            return " ".repeat(inline ? 0 : indent) + "[\n" + obj.map(jt => this.serialize(jt, indent + 2)).join(",\n") + " ]";
        }
        const Class = Object.getPrototypeOf(obj);
        const className = Class.constructor.name;
        const unapply = this.classMap[className];
        if (!unapply) {
            return " ".repeat(inline ? 0 : indent) + JSON.stringify(obj);
        }
        else {
            return " ".repeat(inline ? 0 : indent) + `new ${className}(${unapply[1](obj).map(it => {
                return this.serialize(it, indent, true);
            }).join(", ")})`;
        }
    }
    deserialize(str) {
        const classNames = [];
        const classes = [];
        for (const [key, value] of Object.entries(this.classMap)) {
            classNames.push(key);
            classes.push(value[0]);
        }
        classNames.push(`return ${str}`);
        return new Function(...classNames)(...classes);
    }
}
exports.default = Context;
