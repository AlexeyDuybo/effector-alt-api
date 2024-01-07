import { Event, Store } from "effector";
import { store, unitTargetable, value } from "./utils";
import { assert } from "./assert";
import {
  SampleTargetEventKind as EventKind,
  SampleTargetStoreKind as StoreKind,
  SampleTargetKind,
} from "../src/target-kind";
import {
  SampleFilterWithClock,
  SampleFilterWithClockAndSource,
  SampleFilterWithSource,
} from "../src/filter";
import { SampleFnWithClock, SampleFnWithClockAndSource } from "../src/fn";

declare const filterWithClock: <
  Clock,
  TargetKind extends SampleTargetKind = SampleTargetKind,
>() => SampleFilterWithClock<TargetKind, Clock>;
declare const filterWithSource: <
  Source,
  TargetKind extends SampleTargetKind = SampleTargetKind,
>() => SampleFilterWithSource<TargetKind, Source>;
declare const filterWithClockAndSource: <
  Clock,
  Source,
  TargetKind extends SampleTargetKind = SampleTargetKind,
>() => SampleFilterWithClockAndSource<TargetKind, Clock, Source>;

filterWithClock<string>()((clock) => assert<string>()(clock) as any);
filterWithClock<string>()(() => true);
filterWithClock<string | number>()((clock): clock is string => true);
filterWithClock<string>()(store<boolean>());
// @ts-expect-error wrong filter return type
filterWithClock<string>()(() => value<number>());

filterWithClock<string>()(store<boolean>(), unitTargetable<string>());
filterWithClock<string>()(() => true, unitTargetable<string>());
filterWithClock<string>()(
  (clock): clock is string => true,
  unitTargetable<string>(),
);
// @ts-expect-error filter must be type predicate
filterWithClock<string | number>()(store<boolean>(), unitTargetable<string>());
// @ts-expect-error filter must be type predicate
filterWithClock<string | number>()(() => true, unitTargetable<string>());
filterWithClock<string | number>()(
  // @ts-expect-error type predicate is not assignable to target
  (clock): clock is string | number => true,
  unitTargetable<string>(),
);
filterWithClock<string | number>()(
  (clock): clock is string => true,
  unitTargetable<string>(),
);
filterWithClock<string>()(store<boolean>(), unitTargetable<void>());

filterWithClock<string>()(store<boolean>(), [
  unitTargetable<string>(),
  unitTargetable<string>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClock<string>()(store<boolean>(), [
  unitTargetable<number>(),
  unitTargetable<string>(),
]);
filterWithClock<string>()(store<boolean>(), [
  unitTargetable<number | string>(),
  unitTargetable<string | boolean>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClock<string[]>()(store<boolean>(), [
  unitTargetable<number[]>(),
  unitTargetable<string[]>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClock<number[]>()(store<boolean>(), [
  unitTargetable<(number | string)[]>(),
  unitTargetable<string[]>(),
]);
filterWithClock<(number | string)[]>()(store<boolean>(), [
  unitTargetable<(number | string | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);
filterWithClock<{ a: string; b: number }[]>()(store<boolean>(), [
  unitTargetable<{ a: string }[]>(),
  unitTargetable<{ b: number }[]>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClock<{ a: string }[]>()(store<boolean>(), [
  unitTargetable<{ a: string }[]>(),
  unitTargetable<{ b: number }[]>(),
]);
filterWithClock<string[]>()(() => true, [unitTargetable<void>()]);
filterWithClock<string[]>()(
  () => true,
  [unitTargetable<void>(), unitTargetable<string[]>()],
);
filterWithClock<string[]>()(
  // @ts-expect-error clock is not assignable to target
  () => true,
  [unitTargetable<void>(), unitTargetable<number>()],
);
assert<void>()(
  filterWithClock<string, EventKind>()(() => true, unitTargetable<string>()),
);
assert<{
  toTarget: () => Event<string>;
  fn: SampleFnWithClock<EventKind, string>;
}>()(filterWithClock<string, EventKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClock<StoreKind, string>;
}>()(filterWithClock<string, StoreKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClock<StoreKind, string>;
}>()(
  filterWithClock<string | number, StoreKind>()(
    (clock): clock is string => true,
  ),
);

filterWithSource<string>()((source) => assert<string>()(source) as any);
filterWithSource<string>()(() => true);
filterWithSource<string | number>()((source): source is string => true);
filterWithSource<string>()(store<boolean>());
// @ts-expect-error wrong filter return type
filterWithSource<string>()(() => value<number>());

filterWithSource<string>()(store<boolean>(), unitTargetable<string>());
filterWithSource<string>()(() => true, unitTargetable<string>());
filterWithSource<string>()(
  (source): source is string => true,
  unitTargetable<string>(),
);
// @ts-expect-error filter must be type predicate
filterWithSource<string | number>()(store<boolean>(), unitTargetable<string>());
// @ts-expect-error filter must be type predicate
filterWithSource<string | number>()(() => true, unitTargetable<string>());
filterWithSource<string | number>()(
  // @ts-expect-error type predicate is not assignable to target
  (source): source is string | number => true,
  unitTargetable<string>(),
);
filterWithSource<string | number>()(
  (source): source is string => true,
  unitTargetable<string>(),
);
filterWithSource<string>()(store<boolean>(), unitTargetable<void>());

filterWithSource<string>()(store<boolean>(), [
  unitTargetable<string>(),
  unitTargetable<string>(),
]);
// @ts-expect-error soure is not assignable to target
filterWithSource<string>()(store<boolean>(), [
  unitTargetable<number>(),
  unitTargetable<string>(),
]);
filterWithSource<string>()(store<boolean>(), [
  unitTargetable<number | string>(),
  unitTargetable<string | boolean>(),
]);
// @ts-expect-error soure is not assignable to target
filterWithSource<string[]>()(store<boolean>(), [
  unitTargetable<number[]>(),
  unitTargetable<string[]>(),
]);
// @ts-expect-error soure is not assignable to target
filterWithSource<number[]>()(store<boolean>(), [
  unitTargetable<(number | string)[]>(),
  unitTargetable<string[]>(),
]);
filterWithSource<(number | string)[]>()(store<boolean>(), [
  unitTargetable<(number | string | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);
filterWithSource<{ a: string; b: number }[]>()(store<boolean>(), [
  unitTargetable<{ a: string }[]>(),
  unitTargetable<{ b: number }[]>(),
]);
// @ts-expect-error soure is not assignable to target
filterWithSource<{ a: string }[]>()(store<boolean>(), [
  unitTargetable<{ a: string }[]>(),
  unitTargetable<{ b: number }[]>(),
]);
filterWithSource<string[]>()(() => true, [unitTargetable<void>()]);
filterWithSource<string[]>()(
  () => true,
  [unitTargetable<void>(), unitTargetable<string[]>()],
);
filterWithSource<string[]>()(
  // @ts-expect-error soure is not assignable to target
  () => true,
  [unitTargetable<void>(), unitTargetable<number>()],
);
assert<void>()(
  filterWithSource<string, EventKind>()(() => true, unitTargetable<string>()),
);
assert<{
  toTarget: () => Event<string>;
  fn: SampleFnWithClock<EventKind, string>;
}>()(filterWithSource<string, EventKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClock<StoreKind, string>;
}>()(filterWithSource<string, StoreKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClock<StoreKind, string>;
}>()(
  filterWithSource<string | number, StoreKind>()(
    (clock): clock is string => true,
  ),
);

filterWithClockAndSource<string, number>()(
  (source) => assert<number>()(source) as any,
);
filterWithClockAndSource<string, number>()(
  (_, clock) => assert<string>()(clock) as any,
);
filterWithClockAndSource<string, number>()(() => true);
filterWithClockAndSource<string, number>()((source): source is number => true);
filterWithClockAndSource<string, number>()((_, clock): clock is string => true);
filterWithClockAndSource<string, number>()(store<boolean>());
// @ts-expect-error wrong filter return type
filterWithClockAndSource<string, number>()(() => value<number>());

filterWithClockAndSource<number, string>()(
  store<boolean>(),
  unitTargetable<string>(),
);
filterWithClockAndSource<number, string>()(
  () => true,
  unitTargetable<string>(),
);
filterWithClockAndSource<number, string>()(
  (source): source is string => true,
  unitTargetable<string>(),
);
filterWithClockAndSource<number, string>()(
  (_, clock): clock is number => true,
  unitTargetable<string>(),
);

filterWithClockAndSource<boolean, string | number>()(
  // @ts-expect-error filter must be type predicate
  store<boolean>(),
  unitTargetable<string>(),
);
filterWithClockAndSource<boolean, string | number>()(
  // @ts-expect-error filter must be type predicate
  () => true,
  unitTargetable<string>(),
);
filterWithClockAndSource<boolean, string | number>()(
  // @ts-expect-error source type predicate is not assignable to target
  (source): source is string | number => true,
  unitTargetable<string>(),
);
filterWithClockAndSource<boolean, string | number>()(
  (source): source is string => true,
  unitTargetable<string>(),
);
filterWithClockAndSource<boolean, string | number>()(
  () => true,
  unitTargetable<void>(),
);

filterWithClockAndSource<boolean, string>()(store<boolean>(), [
  unitTargetable<string>(),
  unitTargetable<string>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClockAndSource<boolean, string>()(store<boolean>(), [
  unitTargetable<number>(),
  unitTargetable<string>(),
]);
filterWithClockAndSource<boolean, string>()(store<boolean>(), [
  unitTargetable<number | string>(),
  unitTargetable<string | boolean>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClockAndSource<boolean, string[]>()(store<boolean>(), [
  unitTargetable<number[]>(),
  unitTargetable<string[]>(),
]);
// @ts-expect-error clock is not assignable to target
filterWithClockAndSource<boolean, number[]>()(store<boolean>(), [
  unitTargetable<(number | string)[]>(),
  unitTargetable<string[]>(),
]);
filterWithClockAndSource<boolean, (number | string)[]>()(store<boolean>(), [
  unitTargetable<(number | string | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);
filterWithClockAndSource<boolean, { a: string; b: number }[]>()(
  store<boolean>(),
  [unitTargetable<{ a: string }[]>(), unitTargetable<{ b: number }[]>()],
);
// @ts-expect-error clock is not assignable to target
filterWithClockAndSource<boolean, { a: string }[]>()(store<boolean>(), [
  unitTargetable<{ a: string }[]>(),
  unitTargetable<{ b: number }[]>(),
]);
filterWithClockAndSource<boolean, string[]>()(
  () => true,
  [unitTargetable<void>()],
);
filterWithClockAndSource<boolean, string[]>()(
  () => true,
  [unitTargetable<void>(), unitTargetable<string[]>()],
);
filterWithClockAndSource<boolean, string[]>()(
  // @ts-expect-error clock is not assignable to target
  () => true,
  [unitTargetable<void>(), unitTargetable<number>()],
);
assert<void>()(
  filterWithClockAndSource<boolean, string, EventKind>()(
    () => true,
    unitTargetable<string>(),
  ),
);
assert<{
  toTarget: () => Event<string>;
  fn: SampleFnWithClockAndSource<EventKind, number, string>;
}>()(filterWithClockAndSource<number, string, EventKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClockAndSource<StoreKind, number, string>;
}>()(filterWithClockAndSource<number, string, StoreKind>()(() => true));
assert<{
  toTarget: () => Store<string>;
  fn: SampleFnWithClockAndSource<StoreKind, number, string>;
}>()(
  filterWithClockAndSource<number, string | number, StoreKind>()(
    (source): source is string => true,
  ),
);
