import { World } from './world';
import { Entity } from './entity';
import { ComponentClass } from './component';

export type SystemClass<S extends System = System> = new (...args: any[]) => S;

export abstract class System {
  public components: Set<ComponentClass>;
  protected world: World;

  protected constructor(world: World) {
    this.world = world;
  }

  /**
   * Update.
   * @param delta
   * @param entities
   */
  public abstract update(delta: number, entities: Set<Entity>): void;
}
