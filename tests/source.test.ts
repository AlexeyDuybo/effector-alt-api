import { Event, Store, Unit } from "effector";
import { store, effect, event, unit, unitTargetable } from "./utils";
import { assert, Assert } from "./assert";
import {
  SampleSource,
  SampleSourceWithClock,
  SampleSourceShape,
  SourceShapeByValue,
} from "../src/source";
import {
  SampleFilterWithSource,
  SampleFilterWithClockAndSource,
} from "../src/filter";
import { SampleFnWithSource, SampleFnWithClockAndSource } from "../src/fn";
import {
  SampleTargetKind,
  SampleTargetEventKind as EventKind,
  SampleTargetStoreKind as StoreKind,
} from "../src/target-kind";

declare const source: () => SampleSource;
declare const sourceWithClock: <
  ClockValue,
  TargetKind extends SampleTargetKind = SampleTargetKind,
>() => SampleSourceWithClock<TargetKind, ClockValue>;
// eslint-disable-next-line
type tests = [
  Assert<SourceShapeByValue<any>, SampleSourceShape>,
  Assert<SourceShapeByValue<string>, Unit<string>>,
  Assert<SourceShapeByValue<string | number>, Unit<string | number>>,
  Assert<SourceShapeByValue<string & number>, Unit<never>>,

  Assert<
    SourceShapeByValue<{ a: string; b: number }>,
    Unit<{ a: string; b: number }> | { a: Store<string>; b: Store<number> }
  >,
  Assert<
    SourceShapeByValue<{ a: string; b: number } | { c: boolean; d: null }>,
    | Unit<{ a: string; b: number } | { c: boolean; d: null }>
    | { a: Store<string>; b: Store<number> }
    | { c: Store<boolean>; d: Store<null> }
  >,
  Assert<
    SourceShapeByValue<{ a: string; b: number } & { c: boolean; d: null }>,
    | Unit<{ a: string; b: number } & { c: boolean; d: null }>
    | { a: Store<string>; b: Store<number>; c: Store<boolean>; d: Store<null> }
  >,
  Assert<
    SourceShapeByValue<{ a: string; b: number } & string>,
    Unit<{ a: string; b: number } & string>
  >,
  Assert<
    SourceShapeByValue<{ a: string; b: number } & (() => true)>,
    Unit<{ a: string; b: number } & (() => true)>
  >,
  Assert<
    SourceShapeByValue<{ a: string; b: number } & string[]>,
    Unit<{ a: string; b: number } & string[]>
  >,

  Assert<SourceShapeByValue<string[]>, Unit<string[]> | Store<string>[]>,
  Assert<
    SourceShapeByValue<string[] | number[]>,
    Unit<string[] | number[]> | Store<string>[] | Store<number>[]
  >,
  Assert<
    SourceShapeByValue<(string | number)[] | number[]>,
    | Unit<(string | number)[] | number[]>
    | Store<string | number>[]
    | Store<number>[]
  >,
  Assert<
    SourceShapeByValue<string[] & number[]>,
    Unit<string[] & number[]> | Store<never>[]
  >,
  Assert<SourceShapeByValue<string[] & number>, Unit<string[] & number>>,

  Assert<
    SourceShapeByValue<{ a: string; b: number } & string[]>,
    Unit<{ a: string; b: number } & string[]>
  >,
  Assert<
    SourceShapeByValue<[string, number, boolean]>,
    | Unit<[string, number, boolean]>
    | [Store<string>, Store<number>, Store<boolean>]
  >,
  Assert<
    SourceShapeByValue<[string, number, boolean] | [string, number, number]>,
    | Unit<[string, number, boolean] | [string, number, number]>
    | [Store<string>, Store<number>, Store<boolean>]
    | [Store<string>, Store<number>, Store<number>]
  >,
  Assert<
    SourceShapeByValue<[string, number, boolean] & [string, number, number]>,
    Unit<[string, number, boolean] & [string, number, number]>
  >,

  Assert<
    SourceShapeByValue<[string, number, boolean] & [string, number, number]>,
    Unit<[string, number, boolean] & [string, number, number]>
  >,

  Assert<
    SourceShapeByValue<string | { a: string } | string[]>,
    | Unit<string | { a: string } | string[]>
    | { a: Store<string> }
    | Store<string>[]
  >,
  Assert<
    // @ts-expect-error no error here
    SourceShapeByValue<(string | number)[] & [string, number]>,
    | [Store<string>, Store<number>]
    | Unit<(string | number)[] & [string, number | boolean]>
  >,

  Assert<
    SourceShapeByValue<string & { a: string }>,
    Unit<string & { a: string }>
  >,

  Assert<SourceShapeByValue<string & string[]>, Unit<string & string[]>>,

  Assert<
    SourceShapeByValue<string & [string, number]>,
    Unit<string & [string, number]>
  >,

  Assert<
    SourceShapeByValue<string & { a: string } & string[] & [string, number]>,
    Unit<string & { a: string } & string[] & [string, number]>
  >,
];

source()(store());
source()(event());
source()(effect());
source()([store(), store()]);
source()({ foo: store(), bar: store() });
// @ts-expect-error wrong source type
source()([store(), event()]);
// @ts-expect-error wrong source type
source()({ foo: store(), bar: event() });

source()(unit<string>(), unitTargetable<string>());
source()(unit<string>(), unitTargetable<string | number>());
// @ts-expect-error source is not assignable to target
source()(unit<string>(), unitTargetable<number>());
// @ts-expect-error source is not assignable to target
source()(unit<void>(), unitTargetable<number>());
source()(unit<number>(), unitTargetable<void>());
source()(unit<string>(), [unitTargetable<string>()]);
source()(unit<string>(), [unitTargetable<string>(), unitTargetable<string>()]);
// @ts-expect-error source is not assignable to target
source()(unit<any>(), [unitTargetable<string>(), unitTargetable<number>()]);
source()(unit<number>(), [
  unitTargetable<string | number>(),
  unitTargetable<boolean | number>(),
]);
source()(unit<{ foo: string; bar: string }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
// @ts-expect-error source is not assignable to target
source()(unit<{ foo: string; bar: number }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
// @ts-expect-error source is not assignable to target
source()(unit<{ foo: string }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
source()(unit<number>(), [unitTargetable<void>()]);
source()(unit<number>(), [unitTargetable<void>(), unitTargetable<number>()]);
// @ts-expect-error source is not assignable to target
source()(unit<number>(), [unitTargetable<void>(), unitTargetable<string>()]);

// @ts-expect-error source is not assignable to target
source()(unit<string[]>(), [
  unitTargetable<string[]>(),
  unitTargetable<number[]>(),
]);
// @ts-expect-error source is not assignable to target
source()(unit<string[]>(), [
  unitTargetable<(string | number)[]>(),
  unitTargetable<number[]>(),
]);
source()(unit<(string | number)[]>(), [
  unitTargetable<(string | number | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);

source()([store<string>(), store<string>()], unitTargetable<string[]>());
source()(
  [store<string>(), store<number>()],
  unitTargetable<(string | number)[]>(),
);
source()([store<string>()], unitTargetable<[string]>());
source()(
  [store<string>(), store<number>()],
  unitTargetable<[string, number]>(),
);
source()([store<string>()], unitTargetable<string[]>());
source()(
  [store<string>(), store<number>()],
  unitTargetable<(string | number)[]>(),
);
source()([store<string>()], unitTargetable<(string | number)[]>());
source()([store<string>()], unitTargetable<[string | number]>());
// @ts-expect-error source is not assignable to target
source()([store<number>()], unitTargetable<string[]>());
// @ts-expect-error source is not assignable to target
source()([store<number>()], unitTargetable<string[]>());
source()([store<number>()], unitTargetable<void>());

// @ts-expect-error source is not assignable to target
source()([store<void>()], unitTargetable<number[]>);
source()([store<string>()], [unitTargetable<[string]>()]);
source()(
  [store<string>(), store<number>()],
  [unitTargetable<[string, number]>()],
);
source()(
  [store<string>(), store<number>()],
  [unitTargetable<[string, number]>(), unitTargetable<[string, number]>()],
);
source()([store<string>()], [unitTargetable<string[]>()]);
source()(
  [store<string>(), store<number>()],
  [unitTargetable<(string | number)[]>()],
);
source()(
  [store<string>(), store<number>()],
  [unitTargetable<(string | number)[]>(), unitTargetable<[string, number]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<any>(), store<string>()],
  [unitTargetable<string[]>(), unitTargetable<number[]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<string>(), store<string>()],
  [unitTargetable<(string | number)[]>(), unitTargetable<number[]>()],
);
source()(
  [store<string>(), store<number>()],
  [
    unitTargetable<(string | number | boolean)[]>(),
    unitTargetable<(string | number | null)[]>(),
  ],
);
source()([store<number>()], [unitTargetable<void>()]);
source()(
  [store<number>()],
  [unitTargetable<void>(), unitTargetable<number[]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<number>()],
  [unitTargetable<void>(), unitTargetable<string[]>()],
);
source()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string }[]>()],
);
source()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string; bar: string }[]>()],
);
source()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string; bar: string }>(), store<{ foo: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
source()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string; bar: boolean }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);

source()(
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: number }>(),
);
source()(
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: number } | string>(),
);
source()(
  // @ts-expect-error source is not assignable to target
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: boolean }>(),
);
// @ts-expect-error source is not assignable to target
source()({}, unitTargetable<number>());
source()({ a: store<string>() }, unitTargetable<void>());
source()({ a: store<string>() }, [unitTargetable<{ a: string }>()]);
source()({ a: store<string>() }, [
  unitTargetable<{ a: string }>(),
  unitTargetable<{ a: string }>(),
]);
// @ts-expect-error source is not assignable to target
source()({}, [unitTargetable<string>(), unitTargetable<number>()]);
source()({ a: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: string | boolean }>(),
]);
source()({ a: store<string>(), b: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: string | boolean }>(),
  unitTargetable<{ b: string | number }>(),
  unitTargetable<{ b: string | boolean }>(),
]);
// @ts-expect-error source is not assignable to target
source()({ a: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ b: string | boolean }>(),
]);
// @ts-expect-error source is not assignable to target
source()({ a: store<any>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: boolean | null }>(),
]);
source()({ a: store<string>() }, [unitTargetable<void>()]);
source()({ a: store<string>() }, [
  unitTargetable<void>(),
  unitTargetable<{ a: string }>(),
]);
// @ts-expect-error source is not assignable to target
source()({ a: store<string>() }, [
  unitTargetable<void>(),
  unitTargetable<{ a: number }>(),
]);

assert<{
  toTarget: () => Event<string>;
  filter: SampleFilterWithSource<EventKind, string>;
  fn: SampleFnWithSource<EventKind, string>;
}>()(source()(event<string>()));
assert<{
  toTarget: () => Store<string>;
  filter: SampleFilterWithSource<StoreKind, string>;
  fn: SampleFnWithSource<StoreKind, string>;
}>()(source()(store<string>()));
assert<{
  toTarget: () => Event<string>;
  filter: SampleFilterWithSource<EventKind, string>;
  fn: SampleFnWithSource<EventKind, string>;
}>()(source()(effect<string>()));
assert<{
  toTarget: () => Event<[string, number, boolean]>;
  filter: SampleFilterWithSource<EventKind, [string, number, boolean]>;
  fn: SampleFnWithSource<EventKind, [string, number, boolean]>;
}>()(source()([store<string>(), store<number>(), store<boolean>()]));
assert<{
  toTarget: () => Event<{ a: string; b: number }>;
  filter: SampleFilterWithSource<EventKind, { a: string; b: number }>;
  fn: SampleFnWithSource<EventKind, { a: string; b: number }>;
}>()(source()({ a: store<string>(), b: store<number>() }));
assert<void>()(source()(event<string>(), unitTargetable<string>()));

sourceWithClock()(store());
sourceWithClock()(event());
sourceWithClock()(effect());
sourceWithClock()([store(), store()]);
sourceWithClock()({ foo: store(), bar: store() });
// @ts-expect-error wrong source type
sourceWithClock()([store(), event()]);
// @ts-expect-error wrong source type
sourceWithClock()({ foo: store(), bar: event() });

sourceWithClock()(unit<string>(), unitTargetable<string>());
sourceWithClock()(unit<string>(), unitTargetable<string | number>());
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<string>(), unitTargetable<number>());
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<void>(), unitTargetable<number>());
sourceWithClock()(unit<number>(), unitTargetable<void>());
sourceWithClock()(unit<string>(), [unitTargetable<string>()]);
sourceWithClock()(unit<string>(), [
  unitTargetable<string>(),
  unitTargetable<string>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<any>(), [
  unitTargetable<string>(),
  unitTargetable<number>(),
]);
sourceWithClock()(unit<number>(), [
  unitTargetable<string | number>(),
  unitTargetable<boolean | number>(),
]);
sourceWithClock()(unit<{ foo: string; bar: string }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<{ foo: string; bar: number }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<{ foo: string }>(), [
  unitTargetable<{ foo: string }>(),
  unitTargetable<{ bar: string }>(),
]);
sourceWithClock()(unit<number>(), [unitTargetable<void>()]);
sourceWithClock()(unit<number>(), [
  unitTargetable<void>(),
  unitTargetable<number>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<number>(), [
  unitTargetable<void>(),
  unitTargetable<string>(),
]);

// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<string[]>(), [
  unitTargetable<string[]>(),
  unitTargetable<number[]>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()(unit<string[]>(), [
  unitTargetable<(string | number)[]>(),
  unitTargetable<number[]>(),
]);
sourceWithClock()(unit<(string | number)[]>(), [
  unitTargetable<(string | number | boolean)[]>(),
  unitTargetable<(string | number | null)[]>(),
]);

sourceWithClock()(
  [store<string>(), store<string>()],
  unitTargetable<string[]>(),
);
sourceWithClock()(
  [store<string>(), store<number>()],
  unitTargetable<(string | number)[]>(),
);
sourceWithClock()([store<string>()], unitTargetable<[string]>());
sourceWithClock()(
  [store<string>(), store<number>()],
  unitTargetable<[string, number]>(),
);
sourceWithClock()([store<string>()], unitTargetable<string[]>());
sourceWithClock()(
  [store<string>(), store<number>()],
  unitTargetable<(string | number)[]>(),
);
sourceWithClock()([store<string>()], unitTargetable<(string | number)[]>());
sourceWithClock()([store<string>()], unitTargetable<[string | number]>());
// @ts-expect-error source is not assignable to target
sourceWithClock()([store<number>()], unitTargetable<string[]>());
// @ts-expect-error source is not assignable to target
sourceWithClock()([store<number>()], unitTargetable<string[]>());
sourceWithClock()([store<number>()], unitTargetable<void>());
// @ts-expect-error source is not assignable to target
sourceWithClock()([store<void>()], unitTargetable<number[]>);
sourceWithClock()([store<string>()], [unitTargetable<[string]>()]);
sourceWithClock()(
  [store<string>(), store<number>()],
  [unitTargetable<[string, number]>()],
);
sourceWithClock()(
  [store<string>(), store<number>()],
  [unitTargetable<[string, number]>(), unitTargetable<[string, number]>()],
);
sourceWithClock()([store<string>()], [unitTargetable<string[]>()]);
sourceWithClock()(
  [store<string>(), store<number>()],
  [unitTargetable<(string | number)[]>()],
);
sourceWithClock()(
  [store<string>(), store<number>()],
  [unitTargetable<(string | number)[]>(), unitTargetable<[string, number]>()],
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  [store<any>(), store<string>()],
  [unitTargetable<string[]>(), unitTargetable<number[]>()],
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  [store<string>(), store<string>()],
  [unitTargetable<(string | number)[]>(), unitTargetable<number[]>()],
);
sourceWithClock()(
  [store<string>(), store<number>()],
  [
    unitTargetable<(string | number | boolean)[]>(),
    unitTargetable<(string | number | null)[]>(),
  ],
);
sourceWithClock()([store<number>()], [unitTargetable<void>()]);
sourceWithClock()(
  [store<number>()],
  [unitTargetable<void>(), unitTargetable<number[]>()],
);
sourceWithClock()(
  [store<number>()],
  // @ts-expect-error source is not assignable to target
  [unitTargetable<void>(), unitTargetable<string>],
);
sourceWithClock()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string }[]>()],
);
sourceWithClock()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string; bar: string }[]>()],
);
sourceWithClock()(
  [store<{ foo: string; bar: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string; bar: string }>(), store<{ foo: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  [store<{ foo: string; bar: boolean }>()],
  [unitTargetable<{ foo: string }[]>(), unitTargetable<{ bar: string }[]>()],
);

sourceWithClock()(
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: number }>(),
);
sourceWithClock()(
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: number } | string>(),
);
sourceWithClock()(
  // @ts-expect-error source is not assignable to target
  { a: store<string>(), b: store<number>() },
  unitTargetable<{ a: string; b: boolean }>(),
);
// @ts-expect-error source is not assignable to target
sourceWithClock()({}, unitTargetable<number>());
sourceWithClock()({ a: store<string>() }, unitTargetable<void>());
sourceWithClock()({ a: store<string>() }, [unitTargetable<{ a: string }>()]);
sourceWithClock()({ a: store<string>() }, [
  unitTargetable<{ a: string }>(),
  unitTargetable<{ a: string }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()({}, [unitTargetable<string>(), unitTargetable<number>()]);
sourceWithClock()({ a: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: string | boolean }>(),
]);
sourceWithClock()({ a: store<string>(), b: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: string | boolean }>(),
  unitTargetable<{ b: string | number }>(),
  unitTargetable<{ b: string | boolean }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()({ a: store<string>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ b: string | boolean }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()({ a: store<any>() }, [
  unitTargetable<{ a: string | number }>(),
  unitTargetable<{ a: boolean | null }>(),
]);
sourceWithClock()({ a: store<string>() }, [unitTargetable<void>()]);
sourceWithClock()({ a: store<string>() }, [
  unitTargetable<void>(),
  unitTargetable<{ a: string }>(),
]);
// @ts-expect-error source is not assignable to target
sourceWithClock()({ a: store<string>() }, [
  unitTargetable<void>(),
  unitTargetable<{ a: number }>(),
]);

assert<{
  toTarget: () => Event<string>;
  filter: SampleFilterWithClockAndSource<EventKind, number, string>;
  fn: SampleFnWithClockAndSource<EventKind, number, string>;
}>()(sourceWithClock<number, EventKind>()(event<string>()));
assert<{
  toTarget: () => Store<string>;
  filter: SampleFilterWithClockAndSource<StoreKind, number, string>;
  fn: SampleFnWithClockAndSource<StoreKind, number, string>;
}>()(sourceWithClock<number, StoreKind>()(event<string>()));
assert<{
  toTarget: () => Event<[string, number, boolean]>;
  filter: SampleFilterWithClockAndSource<
    EventKind,
    number,
    [string, number, boolean]
  >;
  fn: SampleFnWithClockAndSource<EventKind, number, [string, number, boolean]>;
}>()(
  sourceWithClock<number, EventKind>()([
    store<string>(),
    store<number>(),
    store<boolean>(),
  ]),
);
assert<{
  toTarget: () => Event<{ a: string; b: number }>;
  filter: SampleFilterWithClockAndSource<
    EventKind,
    number,
    { a: string; b: number }
  >;
  fn: SampleFnWithClockAndSource<EventKind, number, { a: string; b: number }>;
}>()(
  sourceWithClock<number, EventKind>()({
    a: store<string>(),
    b: store<number>(),
  }),
);
assert<void>()(sourceWithClock()(event<string>(), unitTargetable<string>()));
