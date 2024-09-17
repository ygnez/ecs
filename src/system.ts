import { World } from './world';
import { Entity } from './entity';
import { ComponentClass } from './component';
import { hasAll } from './helpers';

export type SystemClass<S extends AbstractSystem = AbstractSystem> = new (
  ...args: any[]
) => S;

export abstract class AbstractSystem {
  public readonly name: string = 'AbstractSystem';
  public readonly components: Set<ComponentClass>;
  public readonly intersectionStrategy: <T>(a: Set<T>, b: Set<T>) => boolean =
    hasAll;

  constructor(public readonly world: World) {}

  /**
   * Update.
   * @param delta
   * @param entities
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(delta: number, entities: Set<Entity>): void {}
}
