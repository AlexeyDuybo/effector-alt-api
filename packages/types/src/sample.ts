import type { SampleClock } from "./clock";
import type { SampleSource } from "./source";

export type AltSample = {
  clock: SampleClock;
  source: SampleSource;
};
