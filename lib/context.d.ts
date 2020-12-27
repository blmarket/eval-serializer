interface ClassType<T, ArgsT extends any[]> extends Function {
    new (...args: ArgsT): T;
}
declare class Context {
    private classMap;
    private vm;
    add<T, ArgsT extends any[]>(Class: ClassType<T, ArgsT>, unapply: (instance: T) => ArgsT): void;
    serialize(obj: unknown, indent?: number, inline?: boolean): string;
    deserialize(str: string): unknown;
}
export default Context;
