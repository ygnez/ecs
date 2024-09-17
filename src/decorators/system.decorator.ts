import { ComponentClass } from '../component';
import { SystemClass } from '../system';

export function System(...args: ComponentClass[]) {
  return <S extends SystemClass>(Base: S) =>
    class extends Base {
      components = new Set<ComponentClass>(args);
    };
}
