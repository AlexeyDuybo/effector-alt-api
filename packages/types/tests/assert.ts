type AssertRestrinction<T, P, U = { [K in keyof P]: P[K] }> = [T] extends [U]
  ? [U] extends [T]
    ? U
    : never
  : never;

export type Assert<U extends AssertRestrinction<T, U>, T> = void;

export declare const assert: <T>() => <U extends AssertRestrinction<T, U>>(
  p: U,
) => void;
