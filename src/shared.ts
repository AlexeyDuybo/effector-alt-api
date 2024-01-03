export type IsNever<Case, Then, Else> = [Case] extends [never] ? Then : Else;

export type RemapObject<T> = T extends Record<keyof any, any>
  ? { [K in keyof T]: T[K] }
  : T;
