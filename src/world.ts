import { AbstractSystem, SystemClass } from './system';
import { Component, ComponentClass } from './component';
import { Entity } from './entity';
import { ComponentContainer } from './component-container';

export class World {
  private nextId: number = 0;
  private components: Map<ComponentClass, Set<Component>> = new Map<
    ComponentClass,
    Set<Component>
  >();
  private entities: Map<Entity, ComponentContainer> = new Map<
    Entity,
    ComponentContainer
  >();
  private systems: Map<AbstractSystem, Set<Entity>> = new Map<
    AbstractSystem,
    Set<Entity>
  >();

  /*
   * ********************************
   * ENTITY METHODS
   * ********************************
   */

  /**
   * Register and create new system by class name.
   * @param systemClass
   * @return {void}
   */
  public addSystem<S extends AbstractSystem>(
    systemClass: SystemClass<S>,
  ): void {
    const system = new systemClass(this);

    if (!this.systems.has(system)) {
      this.systems.set(system, new Set<Entity>());
    }

    this.onUpdateSystem(system);
  }

  /**
   * Get all systems instances.
   */
  public getSystems() {
    return this.systems;
  }

  /*
   * ********************************
   * ENTITY METHODS
   * ********************************
   */

  /**
   * Create new entity ID.
   * @return {Entity}
   */
  public createEntity(): Entity {
    const entity = ++this.nextId;
    this.entities.set(entity, new ComponentContainer());
    return entity;
  }

  /**
   * Delete entity by ID.
   * @param entity
   */
  public deleteEntity(entity: Entity) {
    if (!this.entities.has(entity)) {
      throw new Error(`No entity: ${entity}`);
    }

    const componentContainer = this.entities.get(entity);

    if (!componentContainer) {
      throw new Error(`No component container for entity: ${entity}`);
    }

    componentContainer.getAll().forEach((value, key) => {
      if (this.components.has(key)) {
        this.components.get(key)?.delete(value);
      }
    });
    componentContainer.clear();

    this.onUpdateEntity(entity);

    this.entities.delete(entity);
  }

  /*
   * ********************************
   * COMPONENTS METHODS
   * ********************************
   */
  public resolveComponent(componentName: string): ComponentClass {
    const componentClass = [...this.components.keys()].find((value) => {
      return value.name === componentName;
    });

    if (componentClass === undefined) {
      throw new Error(`No component class with name ${componentName}`);
    }

    return componentClass;
  }

  /**
   * Register new component class.
   * @param componentClass
   * @return {void}
   */
  public registerComponent<C extends Component>(
    componentClass: ComponentClass<C>,
  ): void {
    if (!this.components.has(componentClass)) {
      this.components.set(componentClass, new Set<Component>());
    }
  }

  /**
   * Add new component instance to entity.
   * @param entity
   * @param componentClass
   * @param data
   * @return {Component}
   */
  public addComponent<C extends Component>(
    entity: Entity,
    componentClass: ComponentClass<C>,
    data?: Omit<C, '$id'>,
  ): C {
    const component = new componentClass();

    if (data) {
      Object.keys(data).forEach((key) => {
        Reflect.set(component, key, Reflect.get(data, key));
      });
    }

    this.registerComponent(componentClass);
    this.components.get(componentClass)?.add(component);
    this.entities.get(entity)?.add(component);

    this.onUpdateEntity(entity);

    return component;
  }

  /**
   * Get component by class from entity.
   * @param entity
   * @param componentClass
   * @return {Component}
   */
  public getComponent<C extends Component>(
    entity: Entity,
    componentClass: ComponentClass<C>,
  ): C {
    if (!this.entities.has(entity)) {
      throw new Error(`No entity with id ${entity}`);
    }

    const components: ComponentContainer = this.entities.get(
      entity,
    ) as ComponentContainer;

    if (!components.has(componentClass)) {
      throw new Error(
        `No component ${componentClass.name} in entity ${entity}`,
      );
    }

    return components.get(componentClass);
  }

  /**
   * Get all component instances by component type.
   * @param componentClass
   * @return {Component[]}
   */
  public getComponents<C extends Component>(
    componentClass: ComponentClass<C>,
  ): C[] {
    if (!this.components.has(componentClass)) {
      return [];
    }

    const components = this.components.get(componentClass) as Set<C>;
    return [...components];
  }

  /*
   * ********************************
   * UPDATE
   * ********************************
   */

  /**
   * Update world.
   * @param delta
   * @return {void}
   */
  public update(delta: number): void {
    for (const [system, entities] of this.systems.entries()) {
      system.update(delta, entities);
    }
  }

  private onUpdateEntity(entity: Entity): void {
    for (const system of this.systems.keys()) {
      this.onUpdateEntitySystem(entity, system);
    }
  }

  private onUpdateSystem(system: AbstractSystem): void {
    for (const entity of this.entities.keys()) {
      this.onUpdateEntitySystem(entity, system);
    }
  }

  private onUpdateEntitySystem(entity: Entity, system: AbstractSystem): void {
    const components = this.entities.get(entity) as ComponentContainer;

    if (
      system.intersectionStrategy(
        components.getAllComponentClasses(),
        system.components,
      )
    ) {
      this.systems.get(system)?.add(entity);
    } else {
      this.systems.get(system)?.delete(entity);
    }
  }

  /*
   * ********************************
   * OUTPUT
   * ********************************
   */

  toString(): string {
    const systemStat: string[] = [];
    const componentStat: string[] = [];

    this.systems.forEach((value, key) => {
      systemStat.push(`[${key.name}] Entities: ${value.size}`);
    });

    this.components.forEach((value, key) => {
      componentStat.push(`[${key.name}] Instances: ${value.size}`);
    });

    return [
      `Entities: ${this.entities.size}`,
      systemStat.join('\t\t'),
      componentStat.join('\t\t'),
      '--------',
    ].join('\n');
  }
}
