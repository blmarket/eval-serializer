declare function toString(obj: any, indent?: number, inline?: boolean): string;
declare function decorate<T>(Class: Function, unapply: (T: any) => any[]): Function;
export { toString, decorate };
