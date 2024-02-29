import { Store, Event } from "effector";
import { SampleClock } from "../src/clock";
import { store, event, effect, unitTargetable, unit } from "./utils";
import { assert } from "./assert";
import {
  SampleTargetEventKind as EventKind,
  SampleTargetStoreKind as StoreKind,
} from "../src/target-kind";
import { SampleSourceWithClock } from "../src/source";
import { SampleFilterWithClock } from "../src/filter";
import { SampleFnWithClock } from "../src/fn";

declare const clock: SampleClock;

clock(store());
clock(store());
clock(effect());
// @ts-expect-error atleas one element in clock
clock([]);
clock([store(), event(), effect()]);
// @ts-expect-error wrong clock type
clock({});
clock(unit<string>(), unitTargetable<string>());
clock(unit<string>(), unitTargetable<void>());
// @ts-expect-error clock is not assignable to target
clock(unit<string | number>(), unitTargetable<string>());
clock(unit<string>(), unitTargetable<string | number>());
// @ts-expect-error clock is not assignable to target
clock(unit<string>(), unitTargetable<number>());
// @ts-expect-error clock is not assignable to target
clock(unit<string>(), [unitTargetable<string>(), unitTargetable<number>()]);
// @ts-expect-error clock is not assignable to target
clock(unit<string[]>(), [
  unitTargetable<(string | number)[]>(),
  unitTargetable<number[]>(),
]);
clock(unit<(string | number)[]>(), [
  unitTargetable<(string | number | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);
// @ts-expect-error clock is not assignable to target
clock(unit<(string | number | boolean)[]>(), [
  unitTargetable<(string | number | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);
clock(unit<string>(), [unitTargetable<string>(), unitTargetable<string>()]);
clock(unit<string>(), [
  unitTargetable<string>(),
  unitTargetable<string>(),
] as const);
clock(unit<string>(), [
  unitTargetable<string | number>(),
  unitTargetable<string | boolean>(),
]);
clock(unit<string>(), [
  unitTargetable<string | number>(),
  unitTargetable<string | boolean>(),
]);
clock(unit<string>(), [unitTargetable<void>()]);
clock(unit<string>(), [unitTargetable<void>(), unitTargetable<string>()]);
// @ts-expect-error clock is not assignable to target
clock(unit<string>(), [unitTargetable<void>(), unitTargetable<number>()]);

// @ts-expect-error clock is not assignable to target
clock(unit<any>(), [unitTargetable<number>(), unitTargetable<boolean>()]);
clock(unit<{ a: string; b: number }>(), [
  unitTargetable<{ a: string }>(),
  unitTargetable<{ b: number }>(),
]);
// @ts-expect-error clock is not assignable to target
clock(unit<{ a: string; b: number }>(), [
  unitTargetable<{ a: string }>(),
  unitTargetable<{ b: string }>(),
]);
// @ts-expect-error clock is not assignable to target
clock(unit<{ a: string }>(), [
  unitTargetable<{ a: string }>(),
  unitTargetable<{ b: string }>(),
]);
// @ts-expect-error clock is not assignable to target
clock(unit<void>(), [unitTargetable<number>]);
clock([unit<string>(), unit<string>()], unitTargetable<string>());
// @ts-expect-error clock is not assignable to target
clock([unit<string>(), unit<number>()], unitTargetable<string>());
clock(
  // @ts-expect-error clock is not assignable to target
  [unit<string[]>()],
  [unitTargetable<(string | number)[]>(), unitTargetable<number[]>()],
);
clock(
  [unit<(string | number)[]>(), unit<string[]>()],
  [
    unitTargetable<(string | number | boolean)[]>(),
    unitTargetable<(string | number | null)[]>(),
  ],
);
clock(
  // @ts-expect-error clock is not assignable to target
  [unit<(string | number | boolean)[]>()],
  [
    unitTargetable<(string | number | boolean)[]>(),
    unitTargetable<(string | number | null)[]>(),
  ],
);
// @ts-expect-error empty arrays not allowed
clock([], []);
assert<void>()(clock(unit(), unitTargetable()));
assert<{
  toTarget: () => Store<string>;
  source: SampleSourceWithClock<StoreKind, string>;
  filter: SampleFilterWithClock<StoreKind, string>;
  fn: SampleFnWithClock<StoreKind, string>;
}>()(clock(store<string>()));
assert<{
  toTarget: () => Event<string>;
  source: SampleSourceWithClock<EventKind, string>;
  filter: SampleFilterWithClock<EventKind, string>;
  fn: SampleFnWithClock<EventKind, string>;
}>()(clock(event<string>()));
assert<{
  toTarget: () => Event<string>;
  source: SampleSourceWithClock<EventKind, string>;
  filter: SampleFilterWithClock<EventKind, string>;
  fn: SampleFnWithClock<EventKind, string>;
}>()(clock(event<string>()));
assert<{
  toTarget: () => Event<string>;
  source: SampleSourceWithClock<EventKind, string>;
  filter: SampleFilterWithClock<EventKind, string>;
  fn: SampleFnWithClock<EventKind, string>;
}>()(clock([store<string>()]));
assert<{
  toTarget: () => Event<string | number>;
  source: SampleSourceWithClock<EventKind, string | number>;
  filter: SampleFilterWithClock<EventKind, string | number>;
  fn: SampleFnWithClock<EventKind, string | number>;
}>()(clock([store<string>(), event<number>()]));
