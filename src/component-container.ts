import { Component, ComponentClass } from './component';

export class ComponentContainer {
  private map = new Map<ComponentClass, Component>();

  public add(component: Component): void {
    this.map.set(component.constructor as ComponentClass, component);
  }

  public get<C extends Component>(componentClass: ComponentClass<C>): C {
    return this.map.get(componentClass) as C;
  }

  public has(componentClass: ComponentClass): boolean {
    return this.map.has(componentClass);
  }

  public delete(componentClass: ComponentClass): void {
    this.map.delete(componentClass);
  }

  /**
   * # Equivalent intersection type
   *
   * Both sets are equal.
   *
   * @param componentClasses
   */
  public allOf(componentClasses: Set<ComponentClass>): boolean {
    for (const cls of componentClasses) {
      if (!this.map.has(cls)) {
        return false;
      }
    }

    for (const cls of this.map.keys()) {
      if (!componentClasses.has(cls)) {
        return false;
      }
    }

    return true;
  }

  /**
   * # Intersection union type
   *
   * At least one component of entity is included in system.
   *
   * @param componentClasses
   */
  public oneOf(componentClasses: Iterable<ComponentClass>): boolean {
    for (const cls of componentClasses) {
      if (this.map.has(cls)) {
        return true;
      }
    }

    return false;
  }
}
