import { Assert } from "./assert";
import { IsObject, IsTuple, IsArray, IsAny, IsNever } from "../src/shared";

// eslint-disable-next-line
type tests = [
  Assert<IsAny<any, 1, 2>, 1>,
  Assert<IsAny<never, 1, 2>, 2>,
  Assert<IsAny<unknown, 1, 2>, 2>,
  Assert<IsAny<void, 1, 2>, 2>,

  Assert<IsNever<never, 1, 2>, 1>,
  Assert<IsNever<any, 1, 2>, 2>,
  Assert<IsNever<unknown, 1, 2>, 2>,
  Assert<IsNever<void, 1, 2>, 2>,

  Assert<IsObject<any, 1, 2>, 1>,
  Assert<IsObject<never, 1, 2>, 2>,
  Assert<IsObject<string, 1, 2>, 2>,
  Assert<IsObject<void, 1, 2>, 2>,
  Assert<IsObject<unknown, 1, 2>, 2>,
  Assert<IsObject<null, 1, 2>, 2>,
  Assert<IsObject<undefined, 1, 2>, 2>,
  Assert<IsObject<Record<string, never>, 1, 2>, 1>,
  Assert<IsObject<{ a: string }, 1, 2>, 1>,
  Assert<IsObject<{ a: string } & string, 1, 2>, 2>,
  Assert<IsObject<{ a: string } & void, 1, 2>, 1>,
  Assert<IsObject<{ a: string } & unknown, 1, 2>, 1>,
  Assert<IsObject<{ a: string } & null, 1, 2>, 2>,
  Assert<IsObject<{ a: string } & undefined, 1, 2>, 2>,
  Assert<IsObject<{ a: string } & { a: number }, 1, 2>, 1>,
  Assert<IsObject<{ a: string } & [], 1, 2>, 2>,
  Assert<IsObject<{ a: string } & any[], 1, 2>, 2>,
  Assert<IsObject<{ a: string } & [any], 1, 2>, 2>,
  Assert<IsObject<string[], 1, 2>, 2>,
  Assert<IsObject<[], 1, 2>, 2>,
  Assert<IsObject<[string] & [], 1, 2>, 2>,
  Assert<
    IsObject<[string, number, boolean] & [string, number, number], 1, 2>,
    2
  >,

  Assert<IsTuple<[], 1, 2>, 1>,
  Assert<IsTuple<any[], 1, 2>, 2>,
  Assert<IsTuple<any, 1, 2>, 2>,
  Assert<IsTuple<never, 1, 2>, 2>,
  Assert<IsTuple<[string], 1, 2>, 1>,
  Assert<IsTuple<string[], 1, 2>, 2>,
  Assert<IsTuple<[string] & [], 1, 2>, 2>,
  Assert<IsTuple<[string] & string[], 1, 2>, 1>,
  Assert<IsTuple<[string] & string, 1, 2>, 1>,
  Assert<IsTuple<[string] & unknown, 1, 2>, 1>,
  Assert<IsTuple<[string] & [number, boolean], 1, 2>, 2>,
  Assert<
    IsTuple<[string, number, boolean] & [string, number, number], 1, 2>,
    2
  >,

  Assert<IsArray<string, 1, 2>, 2>,
  Assert<IsArray<void, 1, 2>, 2>,
  Assert<IsArray<never, 1, 2>, 2>,
  Assert<IsArray<unknown, 1, 2>, 2>,

  Assert<IsArray<Record<string, never>, 1, 2>, 2>,
  Assert<IsArray<string, 1, 2>, 2>,
  Assert<IsArray<never, 1, 2>, 2>,
  Assert<IsArray<void, 1, 2>, 2>,
  Assert<IsArray<any, 1, 2>, 2>,
  Assert<IsArray<unknown, 1, 2>, 2>,
  Assert<IsArray<null, 1, 2>, 2>,
  Assert<IsArray<[], 1, 2>, 1>,
  Assert<IsArray<{ a: string }, 1, 2>, 2>,

  Assert<IsArray<string[], 1, 2>, 1>,
  Assert<IsArray<string[] & string, 1, 2>, 2>,
  Assert<IsArray<string[] & void, 1, 2>, 1>,
  Assert<IsArray<string[] & unknown, 1, 2>, 1>,
  Assert<IsArray<string[] & null, 1, 2>, 2>,
  Assert<IsArray<string[] & { a: string }, 1, 2>, 2>,
  Assert<IsArray<string[] & { 1: string }, 1, 2>, 1>,
  Assert<IsArray<string[] & number[], 1, 2>, 1>,
  Assert<IsArray<[] & [], 1, 2>, 1>,

  Assert<IsArray<[string], 1, 2>, 1>,
  Assert<IsArray<[string] & string, 1, 2>, 2>,
  Assert<IsArray<[string] & void, 1, 2>, 1>,
  Assert<IsArray<[string] & unknown, 1, 2>, 1>,
  Assert<IsArray<[string] & null, 1, 2>, 2>,
  Assert<IsArray<[string] & { a: string }, 1, 2>, 2>,
  Assert<IsArray<[string] & { 1: string }, 1, 2>, 1>,
  Assert<IsArray<[string] & [], 1, 2>, 2>,
  Assert<IsArray<[string] & [number], 1, 2>, 1>,
  Assert<
    IsArray<[string, number, boolean] & [string, number, number], 1, 2>,
    2
  >,

  Assert<IsArray<string[] & [], 1, 2>, 1>,
  Assert<IsArray<string[] & [number], 1, 2>, 1>,
];
