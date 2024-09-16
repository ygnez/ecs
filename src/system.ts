import { World } from './world';
import { Entity } from './entity';
import { ComponentClass } from './component';

export type SystemClass<S extends AbstractSystem = AbstractSystem> = new (
  ...args: any[]
) => S;

export abstract class AbstractSystem {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(delta: number, entities: Set<Entity>): void {}
}
