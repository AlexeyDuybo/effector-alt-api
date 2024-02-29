import { Store, Event, Effect, UnitTargetable, Unit } from "effector";
type DefaultType = never;
export const unit = <T = DefaultType>() => ({}) as Unit<T>;
export const unitTargetable = <T = DefaultType>() => ({}) as UnitTargetable<T>;
export const store = <T = DefaultType>() => ({}) as Store<T>;
export const event = <T = DefaultType>() => ({}) as Event<T>;
export const effect = <T = DefaultType, U = unknown>() => ({}) as Effect<T, U>;
export const value = <T>() => ({}) as T;
