type Primitives =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;

export type IsNever<T, Then, Else> = [T] extends [never] ? Then : Else;

export type IsAny<T, Then, Else> = 0 extends 1 & T ? Then : Else;

export type IsObject<T, Then, Else> = IsAny<
  T,
  Then,
  [T] extends [Record<keyof any, any>]
    ? T extends Primitives | ((...args: any) => any) | any[]
      ? Else
      : Then
    : Else
>;

export type IsArray<T, Then, Else> = [T] extends [any[]]
  ? T extends Primitives | ((...args: any) => any)
    ? Else
    : IsNever<
        keyof Omit<T, keyof any[]>,
        Then,
        [keyof Omit<T, keyof any[]>] extends [`${number}`] ? Then : Else
      >
  : Else;

export type IsTuple<T extends any[], Then, Else> = IsNever<
  T,
  Else,
  1111111111 extends T["length"] ? Else : Then
>;
