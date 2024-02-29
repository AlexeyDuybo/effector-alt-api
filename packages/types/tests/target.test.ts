import { SampleTargetShape, GetTargetShapeValue } from "../src/target";
import { unitTargetable } from "./utils";
import { assert } from "./assert";

declare const getTargetShape: <const TargetShape extends SampleTargetShape>(
  shape: TargetShape,
) => GetTargetShapeValue<TargetShape>;

getTargetShape(unitTargetable());
// @ts-expect-error atleast 1 target in array
getTargetShape([]);
getTargetShape([unitTargetable(), unitTargetable()]);

assert<string | number>()(getTargetShape(unitTargetable<string | number>()));
assert<any>()(getTargetShape(unitTargetable<any>()));
assert<any>()(getTargetShape(unitTargetable<void>()));
assert<any>()(getTargetShape(unitTargetable<never>()));

assert<string>()(
  getTargetShape([unitTargetable<string>(), unitTargetable<string>()]),
);
assert<never>()(
  getTargetShape([unitTargetable<string>(), unitTargetable<number>()]),
);
assert<number>()(
  getTargetShape([
    unitTargetable<string | number>(),
    unitTargetable<number | boolean>(),
  ]),
);
assert<string | number>()(
  getTargetShape([unitTargetable<string | number>(), unitTargetable<any>()]),
);
assert<string | number>()(
  getTargetShape([unitTargetable<string | number>(), unitTargetable<void>()]),
);
assert<string | number>()(
  getTargetShape([
    unitTargetable<string | number>(),
    unitTargetable<any>(),
    unitTargetable<void>(),
  ]),
);
assert<any>()(getTargetShape([unitTargetable<any>(), unitTargetable<void>()]));
assert<string | void>()(getTargetShape([unitTargetable<string | void>()]));
assert<string>()(
  getTargetShape([unitTargetable<string | void>(), unitTargetable<string>()]),
);

assert<{ a: string }>()(getTargetShape([unitTargetable<{ a: string }>()]));
assert<{ a: string; b: number }>()(
  getTargetShape([
    unitTargetable<{ a: string }>(),
    unitTargetable<{ b: number }>(),
  ]),
);
assert <
  // @ts-expect-error there is not error
  ({ a: string } & string)()(
    getTargetShape([unitTargetable<{ a: string }>(), unitTargetable<string>()]),
  );

assert<string[]>()(
  getTargetShape([unitTargetable<string[]>(), unitTargetable<string[]>()]),
);
assert<string[] & number[]>()(
  getTargetShape([unitTargetable<string[]>(), unitTargetable<number[]>()]),
);
assert<number[]>()(
  getTargetShape([
    unitTargetable<(string | number)[]>(),
    unitTargetable<number[]>(),
  ]),
);
assert<(string | number)[] & [string, number]>()(
  getTargetShape([
    unitTargetable<(string | number)[]>(),
    unitTargetable<[string, number]>(),
  ]),
);
