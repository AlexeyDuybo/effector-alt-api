import type { Store, Unit, UnitValue } from "effector";
import type { IsNever, IsAny, IsObject, IsTuple, IsArray } from "./shared";
import type {
  GetTargetKind,
  SampleTargetKind,
  GetTargetByKind,
} from "./target-kind";
import type { SampleFnWithClockAndSource, SampleFnWithSource } from "./fn";
import type {
  SampleFilterWithSource,
  SampleFilterWithClockAndSource,
} from "./filter";
import type { GetTargetShapeValue, SampleTargetShape } from "./target";

export type SampleSourceShape =
  | Unit<any>
  | Store<any>[]
  | Record<string, Store<any>>;

export type ArrayValueToArraySourceShape<T extends any[]> = IsTuple<
  T,
  ArrayTupleValueToArrayTupleSourceShape<T>,
  Store<T[number]>[]
>;

type ArrayTupleValueToArrayTupleSourceShape<
  T extends any[],
  Result extends Store<any>[] = [],
> = Result["length"] extends 30
  ? never
  : Result["length"] extends T["length"]
    ? Result
    : ArrayTupleValueToArrayTupleSourceShape<
        T,
        [
          ...Result,
          IsAny<
            T[Result["length"]],
            Store<Parameters<Parameters<T["map"]>[0]>[0]>,
            Store<T[Result["length"]]>
          >,
        ]
      >;

export type SourceShapeByValue<Value> = IsAny<
  Value,
  SampleSourceShape,
  | Unit<Value>
  | (Value extends any
      ? IsObject<Value, { [K in keyof Value]: Store<Value[K]> }, never>
      : never)
  | (Value extends any[]
      ? IsArray<Value, ArrayValueToArraySourceShape<Value>, never>
      : never)
>;

type GetSourceShapeValue<Shape extends SampleSourceShape> =
  Shape extends Unit<any>
    ? UnitValue<Shape>
    : { [K in keyof Shape]: UnitValue<Shape[K]> };

export type SampleSource = <
  const SourceShape extends IsNever<
    TargetShape,
    SampleSourceShape,
    SourceShapeByValue<GetTargetShapeValue<TargetShape>>
  >,
  const TargetShape extends SampleTargetShape = never,
  TargetKind extends SampleTargetKind = GetTargetKind<SourceShape>,
  SourceValue = GetSourceShapeValue<SourceShape>,
>(
  source: SourceShape,
  target?: TargetShape,
) => IsNever<
  TargetShape,
  {
    toTarget: () => GetTargetByKind<TargetKind, SourceValue>;
    filter: SampleFilterWithSource<TargetKind, SourceValue>;
    fn: SampleFnWithSource<TargetKind, SourceValue>;
  },
  void
>;

export type SampleSourceWithClock<
  TargetKind extends SampleTargetKind,
  ClockValue,
> = <
  const SourceShape extends IsNever<
    TargetShape,
    SampleSourceShape,
    SourceShapeByValue<GetTargetShapeValue<TargetShape>>
  >,
  const TargetShape extends SampleTargetShape = never,
  SourceValue = GetSourceShapeValue<SourceShape>,
>(
  source: SourceShape,
  target?: TargetShape,
) => IsNever<
  TargetShape,
  {
    toTarget: () => GetTargetByKind<TargetKind, SourceValue>;
    filter: SampleFilterWithClockAndSource<TargetKind, ClockValue, SourceValue>;
    fn: SampleFnWithClockAndSource<TargetKind, ClockValue, SourceValue>;
  },
  void
>;
