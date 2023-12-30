export type IsNever<Case, Then, Else> = [Case] extends [never] ? Then : Else;
