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

  public clear(): void {
    this.map.clear();
  }

  public getAll() {
    return this.map;
  }

  public getAllComponentClasses(): Set<ComponentClass> {
    return new Set(this.map.keys());
  }

  public getAllComponents(): Set<Component> {
    return new Set(this.map.values());
  }
}
