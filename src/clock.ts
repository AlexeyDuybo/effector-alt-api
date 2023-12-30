import type { Unit, UnitTargetable, UnitValue } from "effector";
import type { IsNever } from "./shared";
import type {
  GetTargetKind,
  SampleTargetKind,
  GetTargetByKind,
} from "./target-kind";
import type { SampleFnWithClock } from "./fn";
import type { SampleFilterWithClock } from "./filter";
import type { SampleSourceWithClock } from "./source";

export type SampleClockShape<Value = any> = Unit<Value> | Unit<Value>[];
type GetClockShapeValue<ClockShape extends SampleClockShape> =
  ClockShape extends SampleClockShape<infer Value> ? Value : never;

export type SampleClock = <
  ClockShape extends SampleClockShape<
    IsNever<TargetUnit, any, UnitValue<TargetUnit>>
  >,
  TargetUnit extends UnitTargetable<any> = never,
  TargetKind extends SampleTargetKind = GetTargetKind<ClockShape>,
  ClockValue = GetClockShapeValue<ClockShape>,
>(
  clock: ClockShape,
  target?: TargetUnit,
) => IsNever<
  TargetUnit,
  {
    source: SampleSourceWithClock<TargetKind, ClockValue>;
    filter: SampleFilterWithClock<TargetKind, ClockValue>;
    fn: SampleFnWithClock<TargetKind, ClockValue>;
    toTarget: () => GetTargetByKind<TargetKind, ClockValue>;
  },
  void
>;
