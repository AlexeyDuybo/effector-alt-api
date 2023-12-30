import type { UnitTargetable, UnitValue } from "effector";
import type { GetTargetByKind, SampleTargetKind } from "./target-kind";
import type { IsNever } from "./shared";

type SampleFnResult<
  TargetUnit extends UnitTargetable<any>,
  TargetKind extends SampleTargetKind,
  FnResult,
> = IsNever<TargetUnit, GetTargetByKind<TargetKind, FnResult>, void>;

export type SampleFnWithClock<
  TargetKind extends SampleTargetKind,
  ClockValue,
> = <
  FnResult extends IsNever<TargetUnit, any, UnitValue<TargetUnit>>,
  TargetUnit extends UnitTargetable<any> = never,
>(
  fn: (clock: ClockValue) => FnResult,
  target?: TargetUnit,
) => SampleFnResult<TargetUnit, TargetKind, FnResult>;

export type SampleFnWithSource<
  TargetKind extends SampleTargetKind,
  SourceValue,
> = <
  FnResult extends IsNever<TargetUnit, any, UnitValue<TargetUnit>>,
  TargetUnit extends UnitTargetable<any> = never,
>(
  fn: (source: SourceValue) => FnResult,
  target?: TargetUnit,
) => SampleFnResult<TargetUnit, TargetKind, FnResult>;

export type SampleFnWithClockAndSource<
  TargetKind extends SampleTargetKind,
  ClockValue,
  SourceValue,
> = <
  FnResult extends IsNever<TargetUnit, any, UnitValue<TargetUnit>>,
  TargetUnit extends UnitTargetable<any> = never,
>(
  fn: (source: SourceValue, clock: ClockValue) => FnResult,
  target?: TargetUnit,
) => SampleFnResult<TargetUnit, TargetKind, FnResult>;
