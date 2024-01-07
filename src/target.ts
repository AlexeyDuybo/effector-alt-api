import type { UnitTargetable } from "effector";
import type { IsAny } from "./shared";

export type SampleTargetShape =
  | UnitTargetable<any>
  | [UnitTargetable<any>, ...UnitTargetable<any>[]];
export type GetTargetShapeValue<TargetShape extends SampleTargetShape> =
  TargetShape extends UnitTargetable<any>[]
    ? GetArrayTargetShapeValue<TargetShape>
    : TargetShape extends UnitTargetable<infer TargetValue>
      ? IsTargetSkippable<TargetValue, any, TargetValue>
      : never;

type IsTargetSkippable<Elem, Then, Else> = [Elem] extends [void]
  ? Then
  : IsAny<Elem, Then, Else>;

type OmitSkippableArrayElements<
  ArrayTargetShape extends UnitTargetable<any>[],
  Result extends UnitTargetable<any>[] = [],
> = ArrayTargetShape extends [
  UnitTargetable<infer HeadValue>,
  ...infer Rest extends UnitTargetable<any>[],
]
  ? OmitSkippableArrayElements<
      Rest,
      IsTargetSkippable<
        HeadValue,
        Result,
        [...Result, UnitTargetable<HeadValue>]
      >
    >
  : Result;

type GetArrayElementsIntersection<
  ArrayTargetShape extends UnitTargetable<any>[],
  Intersection = unknown,
> = ArrayTargetShape extends [
  UnitTargetable<infer HeadValue>,
  ...infer Rest extends UnitTargetable<any>[],
]
  ? GetArrayElementsIntersection<Rest, Intersection & HeadValue>
  : Intersection;

type GetArrayTargetShapeValue<
  ArrayTargetShape extends UnitTargetable<any>[],
  OmitedArrayTargetShape extends
    UnitTargetable<any>[] = OmitSkippableArrayElements<ArrayTargetShape>,
> = OmitedArrayTargetShape["length"] extends 0
  ? any
  : GetArrayElementsIntersection<OmitedArrayTargetShape>;
