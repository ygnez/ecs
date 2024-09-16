import { ComponentClass } from '../component';
import { AbstractSystem } from '../system';

export function System(...args: ComponentClass[]) {
  return function (constructor: typeof AbstractSystem): typeof AbstractSystem {
    return class extends constructor {
      components = new Set<ComponentClass>(args);
    };
  };
}
