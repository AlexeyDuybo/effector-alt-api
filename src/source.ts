import type { Store, Unit, UnitValue } from "effector";
import type { IsNever } from "./shared";
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

type SourceShapeByValue<Value> =
  | Unit<Value>
  | { [K in keyof Value]: Store<Value[K]> };

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
  TargetShape extends SampleTargetShape = never,
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
  TargetShape extends SampleTargetShape = never,
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
