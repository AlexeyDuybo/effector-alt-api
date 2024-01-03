import type { UnitTargetable, UnitValue } from "effector";
import type { RemapObject } from "./shared";

export type SampleTargetShape = UnitTargetable<any> | UnitTargetable<any>[];
export type GetTargetShapeValue<TargetShape extends SampleTargetShape> =
  TargetShape extends (infer ArrayTargetElemet)[]
    ? RemapObject<
        (
          ArrayTargetElemet extends any
            ? (p: UnitValue<ArrayTargetElemet>) => any
            : never
        ) extends (p: infer TargetValue) => any
          ? TargetValue
          : never
      >
    : UnitValue<TargetShape>;
