import type { Unit } from "effector";
import type { IsNever } from "./shared";
import type {
  GetTargetKind,
  SampleTargetKind,
  GetTargetByKind,
} from "./target-kind";
import type { SampleFnWithClock } from "./fn";
import type { SampleFilterWithClock } from "./filter";
import type { SampleSourceWithClock } from "./source";
import type { GetTargetShapeValue, SampleTargetShape } from "./target";

export type SampleClockShape<Value = any> = Unit<Value> | Unit<Value>[];
type GetClockShapeValue<ClockShape extends SampleClockShape> =
  ClockShape extends SampleClockShape<infer Value> ? Value : never;

export type SampleClock = <
  ClockShape extends SampleClockShape<
    IsNever<TargetShape, any, GetTargetShapeValue<TargetShape>>
  >,
  TargetShape extends SampleTargetShape = never,
  TargetKind extends SampleTargetKind = GetTargetKind<ClockShape>,
  ClockValue = GetClockShapeValue<ClockShape>,
>(
  clock: ClockShape,
  target?: TargetShape,
) => IsNever<
  TargetShape,
  {
    source: SampleSourceWithClock<TargetKind, ClockValue>;
    filter: SampleFilterWithClock<TargetKind, ClockValue>;
    fn: SampleFnWithClock<TargetKind, ClockValue>;
    toTarget: () => GetTargetByKind<TargetKind, ClockValue>;
  },
  void
>;
