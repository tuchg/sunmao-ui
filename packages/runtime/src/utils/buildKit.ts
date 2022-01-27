import { Static } from '@sinclair/typebox';
import { createComponent, CreateComponentOptions } from '@sunmao-ui/core';
import { ComponentImpl, ImplementedRuntimeComponent } from '../types';

type ToMap<U> = {
  [K in keyof U]: Static<U[K]>;
};

type ToStringUnion<T extends ReadonlyArray<string>> = T[number];

export function implementRuntimeComponent<
  KMethodName extends string,
  KStyleSlot extends string,
  KSlot extends string,
  KEvent extends string,
  T extends CreateComponentOptions<KMethodName, KStyleSlot, KSlot, KEvent>
>(
  options: T
): (
  impl: ComponentImpl<
    Static<T['spec']['properties']>,
    Static<T['spec']['state']>,
    ToMap<T['spec']['methods']>,
    ToStringUnion<T['spec']['slots']>,
    ToStringUnion<T['spec']['styleSlots']>,
    ToStringUnion<T['spec']['events']>
  >
) => ImplementedRuntimeComponent<KMethodName, KStyleSlot, KSlot, KEvent> {
  return impl => ({
    ...createComponent(options),
    impl,
  });
}