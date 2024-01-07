import type { GetTargetByKind, SampleTargetKind } from "./target-kind";
import type { GetTargetShapeValue, SampleTargetShape } from "./target";
import type { IsNever } from "./shared";

type SampleFnResult<
  TargetShape extends SampleTargetShape,
  TargetKind extends SampleTargetKind,
  FnResult,
> = IsNever<TargetShape, GetTargetByKind<TargetKind, FnResult>, void>;

export type SampleFnWithClock<
  TargetKind extends SampleTargetKind,
  ClockValue,
> = <
  FnResult extends IsNever<TargetShape, any, GetTargetShapeValue<TargetShape>>,
  const TargetShape extends SampleTargetShape = never,
>(
  fn: (clock: ClockValue) => FnResult,
  target?: TargetShape,
) => SampleFnResult<TargetShape, TargetKind, FnResult>;

export type SampleFnWithSource<
  TargetKind extends SampleTargetKind,
  SourceValue,
> = <
  FnResult extends IsNever<TargetShape, any, GetTargetShapeValue<TargetShape>>,
  const TargetShape extends SampleTargetShape = never,
>(
  fn: (source: SourceValue) => FnResult,
  target?: TargetShape,
) => SampleFnResult<TargetShape, TargetKind, FnResult>;

export type SampleFnWithClockAndSource<
  TargetKind extends SampleTargetKind,
  ClockValue,
  SourceValue,
> = <
  FnResult extends IsNever<TargetShape, any, GetTargetShapeValue<TargetShape>>,
  const TargetShape extends SampleTargetShape = never,
>(
  fn: (source: SourceValue, clock: ClockValue) => FnResult,
  target?: TargetShape,
) => SampleFnResult<TargetShape, TargetKind, FnResult>;
