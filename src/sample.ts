import type { SampleClock } from "./clock";
import type { SampleSource } from "./source";

export type CustomSample = {
  clock: SampleClock;
  source: SampleSource;
};
