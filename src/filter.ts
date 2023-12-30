import type { Store, UnitTargetable, UnitValue } from "effector";
import type { IsNever } from "./shared";
import type {
  SampleFnWithClock,
  SampleFnWithClockAndSource,
  SampleFnWithSource,
} from "./fn";
import type { GetTargetByKind, SampleTargetKind } from "./target-kind";

type GetSingleParamPredicateResult<
  BaseValue,
  PredicateFn extends
    | Store<boolean>
    | ((param: BaseValue) => boolean)
    | ((param1: BaseValue) => param1 is any),
> = PredicateFn extends (param: any) => param is infer FilteredValue
  ? FilteredValue
  : BaseValue;

type GetDoubleParamPredicateResult<
  BaseValue1,
  BaseValue2,
  PredicateFn extends
    | Store<boolean>
    | ((param1: BaseValue1, param2: BaseValue2) => boolean)
    | ((param1: BaseValue1, param2: BaseValue2) => param1 is any)
    | ((param1: BaseValue1, param2: BaseValue2) => param2 is any),
> = PredicateFn extends (
  param1: any,
  param2: any,
) => param1 is infer FilteredValue
  ? [FilteredValue, BaseValue2]
  : PredicateFn extends (
        param1: any,
        param2: any,
      ) => param2 is infer FilteredValue
    ? [BaseValue1, FilteredValue]
    : [BaseValue1, BaseValue2];

export type SampleFilterWithClock<
  TargetKind extends SampleTargetKind,
  ClockValue,
> = <
  Predicate extends IsNever<
    TargetUnit,
    | Store<boolean>
    | ((clock: ClockValue) => boolean)
    | ((clock: ClockValue) => clock is any),
    [ClockValue] extends [UnitValue<TargetUnit>]
      ?
          | Store<boolean>
          | ((clock: ClockValue) => boolean)
          | ((clock: ClockValue) => clock is any)
      : (clock: ClockValue) => clock is UnitValue<TargetUnit>
  >,
  TargetUnit extends UnitTargetable<any> = never,
  FilteredClockValue = GetSingleParamPredicateResult<ClockValue, Predicate>,
>(
  filter: Predicate,
  target?: TargetUnit,
) => IsNever<
  TargetUnit,
  {
    toTarget: () => GetTargetByKind<TargetKind, FilteredClockValue>;
    fn: SampleFnWithClock<TargetKind, FilteredClockValue>;
  },
  void
>;

export type SampleFilterWithSource<
  TargetKind extends SampleTargetKind,
  SourceValue,
> = <
  Predicate extends IsNever<
    TargetUnit,
    | Store<boolean>
    | ((source: SourceValue) => boolean)
    | ((source: SourceValue) => source is any),
    [SourceValue] extends [UnitValue<TargetUnit>]
      ?
          | Store<boolean>
          | ((source: SourceValue) => boolean)
          | ((source: SourceValue) => source is any)
      : (clock: SourceValue) => clock is UnitValue<TargetUnit>
  >,
  TargetUnit extends UnitTargetable<any> = never,
  FilteredSourceValue = GetSingleParamPredicateResult<SourceValue, Predicate>,
>(
  filter: Predicate,
  target?: TargetUnit,
) => IsNever<
  TargetUnit,
  {
    toTarget: () => GetTargetByKind<TargetKind, FilteredSourceValue>;
    fn: SampleFnWithSource<TargetKind, FilteredSourceValue>;
  },
  void
>;

export type SampleFilterWithClockAndSource<
  TargetKind extends SampleTargetKind,
  ClockValue,
  SourceValue,
> = <
  Predicate extends IsNever<
    TargetUnit,
    | Store<boolean>
    | ((source: SourceValue, clock: ClockValue) => boolean)
    | ((source: SourceValue, clock: ClockValue) => source is any)
    | ((source: SourceValue, clock: ClockValue) => clock is any),
    [SourceValue] extends [UnitValue<TargetUnit>]
      ?
          | Store<boolean>
          | ((source: SourceValue, clock: ClockValue) => boolean)
          | ((source: SourceValue, clock: ClockValue) => source is any)
          | ((source: SourceValue, clock: ClockValue) => clock is any)
      : (
          source: SourceValue,
          clock: ClockValue,
        ) => source is UnitValue<TargetUnit>
  >,
  TargetUnit extends UnitTargetable<any> = never,
  FilteredValues extends [any, any] = GetDoubleParamPredicateResult<
    SourceValue,
    ClockValue,
    Predicate
  >,
>(
  filter: Predicate,
  target?: TargetUnit,
) => IsNever<
  TargetUnit,
  {
    toTarget: () => GetTargetByKind<TargetKind, FilteredValues[0]>;
    fn: SampleFnWithClockAndSource<
      TargetKind,
      FilteredValues[1],
      FilteredValues[0]
    >;
  },
  void
>;
