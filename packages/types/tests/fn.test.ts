import { Event, Store } from "effector";
import { unitTargetable, value } from "./utils";
import { assert } from "./assert";
import {
  SampleFnWithClock,
  SampleFnWithClockAndSource,
  SampleFnWithSource,
} from "../src/fn";
import {
  SampleTargetKind,
  SampleTargetEventKind as EventKind,
  SampleTargetStoreKind as StoreKind,
} from "../src/target-kind";

declare const fnWithClock: <
  TargetKind extends SampleTargetKind,
  ClockValue,
>() => SampleFnWithClock<TargetKind, ClockValue>;
declare const fnWithSource: <
  TargetKind extends SampleTargetKind,
  SourceValue,
>() => SampleFnWithSource<TargetKind, SourceValue>;
declare const fnWithClockAndSource: <
  TargetKind extends SampleTargetKind,
  ClockValue,
  SourceValue,
>() => SampleFnWithClockAndSource<TargetKind, ClockValue, SourceValue>;

// @ts-expect-error fn type
fnWithClock<EventKind, string>()({});
fnWithClock<EventKind, string>()((clock) => assert<string>()(clock));
fnWithClock<EventKind, string>()(
  () => value<string>(),
  unitTargetable<string>(),
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<string>(),
  unitTargetable<number>(),
);
// @ts-expect-error fn result is not assignable to target
fnWithClock<EventKind, string>()(() => {}, unitTargetable<number>());
fnWithClock<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<number>()],
);
fnWithClock<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<number>()],
);
fnWithClock<EventKind, string>()(() => value<number>(), [
  unitTargetable<number>(),
  unitTargetable<number>(),
] as const);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number[]>(),
  [unitTargetable<number[]>(), unitTargetable<string[]>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number[]>(),
  [unitTargetable<(string | number)[]>(), unitTargetable<string[]>()],
);
fnWithClock<EventKind, string>()(
  () => value<(string | number)[]>(),
  [
    unitTargetable<(string | number | null)[]>(),
    unitTargetable<(string | number | boolean)[]>(),
  ],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<string>()],
);
fnWithClock<EventKind, string>()(
  () => ({ foo: value<string>(), bar: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => ({ foo: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithClock<EventKind, string>()(
  () => value<string>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>() as any,
  [unitTargetable<string>(), unitTargetable<boolean>()],
);
fnWithClock<EventKind, string>()(() => value<number>());
fnWithClock<EventKind, string>()(() => value<number>(), unitTargetable<void>());
fnWithClock<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<void>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<string>()],
);
fnWithClock<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<number>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<any>(), unitTargetable<string>()],
);

assert<Event<number>>()(
  fnWithClock<EventKind, string>()(() => value<number>()),
);
assert<Store<number>>()(
  fnWithClock<StoreKind, string>()(() => value<number>()),
);
assert<void>()(
  fnWithClock<EventKind, string>()(
    () => value<number>(),
    unitTargetable<number>(),
  ),
);

// @ts-expect-error fn type
fnWithSource<EventKind, string>()({});
fnWithSource<EventKind, string>()((clock) => assert<string>()(clock));
fnWithSource<EventKind, string>()(
  () => value<string>(),
  unitTargetable<string>(),
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<string>(),
  unitTargetable<number>(),
);
// @ts-expect-error fn result is not assignable to target
fnWithSource<EventKind, string>()(() => {}, unitTargetable<number>());
fnWithSource<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<number>()],
);
fnWithSource<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<number>()],
);
fnWithSource<EventKind, string>()(() => value<number>(), [
  unitTargetable<number>(),
  unitTargetable<number>(),
] as const);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<string[]>(),
  [unitTargetable<number[]>(), unitTargetable<string[]>()],
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number[]>(),
  [unitTargetable<(string | number)[]>(), unitTargetable<string[]>()],
);
fnWithSource<EventKind, string>()(
  () => value<(string | number)[]>(),
  [
    unitTargetable<(string | number | null)[]>(),
    unitTargetable<(string | number | boolean)[]>(),
  ],
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<string>()],
);
fnWithSource<EventKind, string>()(
  () => ({ foo: value<string>(), bar: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => ({ foo: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithSource<EventKind, string>()(
  () => value<string>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>() as any,
  [unitTargetable<string>(), unitTargetable<boolean>()],
);
fnWithSource<EventKind, string>()(() => value<number>());
fnWithSource<EventKind, string>()(
  () => value<number>(),
  unitTargetable<void>(),
);
fnWithSource<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<void>()],
);
fnWithSource<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<string>()],
);
fnWithSource<EventKind, string>()(
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<number>()],
);
assert<Event<number>>()(
  fnWithSource<EventKind, string>()(() => value<number>()),
);
assert<Store<number>>()(
  fnWithSource<StoreKind, string>()(() => value<number>()),
);
assert<void>()(
  fnWithSource<EventKind, string>()(
    () => value<number>(),
    unitTargetable<number>(),
  ),
);

// @ts-expect-error fn type
fnWithClockAndSource<EventKind, string, number>()({});
fnWithClockAndSource<EventKind, string, number>()((source) =>
  assert<number>()(source),
);
fnWithClockAndSource<EventKind, string, number>()((_, clock) =>
  assert<string>()(clock),
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<string>(),
  unitTargetable<string>(),
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<string>(),
  unitTargetable<number>(),
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => {},
  unitTargetable<number>(),
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<number>(),
  [unitTargetable<number>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<number>()],
);
fnWithClockAndSource<EventKind, string, number>()(() => value<number>(), [
  unitTargetable<number>(),
  unitTargetable<number>(),
] as const);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<string[]>(),
  [unitTargetable<number[]>(), unitTargetable<string[]>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number[]>(),
  [unitTargetable<(string | number)[]>(), unitTargetable<string[]>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<(string | number)[]>(),
  [
    unitTargetable<(string | number | null)[]>(),
    unitTargetable<(string | number | boolean)[]>(),
  ],
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<number>(), unitTargetable<string>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  () => ({ foo: value<string>(), bar: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => ({ foo: value<string>() }),
  [unitTargetable<{ foo: string }>(), unitTargetable<{ bar: string }>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<string>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<string | number>(), unitTargetable<string | boolean>()],
);
fnWithClock<EventKind, string>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>() as any,
  [unitTargetable<string>(), unitTargetable<boolean>()],
);
fnWithClockAndSource<EventKind, string, number>()(() => value<number>());
fnWithClockAndSource<EventKind, string, number>()(
  () => value<number>(),
  unitTargetable<void>(),
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<number>(),
  [unitTargetable<void>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  // @ts-expect-error fn result is not assignable to target
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<string>()],
);
fnWithClockAndSource<EventKind, string, number>()(
  () => value<number>(),
  [unitTargetable<void>(), unitTargetable<number>()],
);
assert<Event<number>>()(
  fnWithClockAndSource<EventKind, string, number>()(() => value<number>()),
);
assert<Store<number>>()(
  fnWithClockAndSource<StoreKind, string, number>()(() => value<number>()),
);
assert<void>()(
  fnWithClockAndSource<EventKind, string, number>()(
    () => value<number>(),
    unitTargetable<number>(),
  ),
);
