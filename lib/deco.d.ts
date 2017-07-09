declare function toString(obj: any, indent?: number, inline?: boolean): any;
declare function decorate<T>(Class: Function, unapply: (T) => any[]): Function;
export { toString, decorate };
