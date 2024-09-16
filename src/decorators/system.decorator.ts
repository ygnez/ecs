import { ComponentClass } from '../component';

export function System(...args: ComponentClass[]) {
  return function (constructor) {
    return class extends constructor {
      components = new Set<ComponentClass>(args);
    };
  };
}
