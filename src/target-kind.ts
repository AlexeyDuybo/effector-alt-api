import type { Event, Store } from "effector";
import type { SampleClockShape } from "./clock";
import type { SampleSourceShape } from "./source";

export type SampleTargetStoreKind = "store";
export type SampleTargetEventKind = "event";
export type SampleTargetKind = SampleTargetEventKind | SampleTargetStoreKind;

export type GetTargetKind<Shape extends SampleClockShape | SampleSourceShape> =
  Shape extends Store<any> ? SampleTargetStoreKind : SampleTargetEventKind;

export type GetTargetByKind<
  TargetKind extends SampleTargetKind,
  TargetValue,
> = TargetKind extends SampleTargetStoreKind
  ? Store<TargetValue>
  : Event<TargetValue>;
