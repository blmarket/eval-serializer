import { VM } from 'vm2';

class Context {
    private classMap: { [className: string]: [any, ((any) => any[])] } = {};
    private vm = new VM();

    add<T>(Class: Function, unapply: (T) => any[]) {
        this.classMap[Class.name] = [Class, unapply];
        this.vm.freeze(Class, Class.name);
    }

    serialize(obj: any, indent: number = 0, inline: boolean = false) {
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
        } else {
            return " ".repeat(inline ? 0 : indent) + `new ${className}(${unapply[1](obj).map(it => {
                return this.serialize(it, indent, true);
            }).join(", ")})`;
        }
    }

    deserialize(str: string): any {
        return this.vm.run(str);
    }
}

export default Context;
