declare class Context {
    private classMap;
    add<T>(Class: Function, unapply: (T: any) => any[]): void;
    serialize(obj: any, indent?: number, inline?: boolean): any;
    deserialize(str: string): any;
}
export default Context;
