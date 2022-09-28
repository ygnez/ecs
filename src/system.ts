import { World } from './world';
import { Entity } from './entity';

export type SystemClass<S extends System = System> = new (...args: any[]) => S;

export abstract class System {
  public abstract components: Set<Function>;
  protected world: World;

  constructor(world: World) {
    this.world = world;
  }

  /**
   * Update.
   * @param delta
   * @param entities
   */
  public abstract update(delta: number, entities: Set<Entity>): void;
}
