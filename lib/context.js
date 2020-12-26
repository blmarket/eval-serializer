"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm2_1 = require("vm2");
class Context {
    constructor() {
        this.classMap = {};
        this.vm = new vm2_1.VM();
    }
    add(Class, unapply) {
        this.classMap[Class.name] = [Class, unapply];
        this.vm.freeze(Class, Class.name);
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
        return this.vm.run(str);
    }
}
exports.default = Context;
