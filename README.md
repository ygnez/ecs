## Ygnez ECS

Lightweight experimental ECS (entity-component-system) framework on TypeScript. Package includes game loop.

## Installation

For NPM:

```bash
$ npm install @ygnez/ecs
```

For Yarn:

```bash
$ yarn add @ygnez/ecs
```

## Using

Create new components:

```typescript
import { Component } from './component';

class Position extends Component {
  public x: number;
  public y: number;
}

class Movement extends Component {
  public speed: number;
  public direction: number;
}
```

Create new system using components Position and Movement:

```typescript
import { System } from './system';
import { Entity } from './entity';

class MovementSystem extends System {
  components: Set<Function> = new Set<Function>([Position, Movement]);

  update(delta: number, entities: Set<Entity>): void {
    entities.forEach((entity) => {
      const movement = this.world.getComponent(entity, Movement);
      const position = this.world.getComponent(entity, Position);
      if (movement.speed !== 0) {
        position.x += Math.cos(movement.direction) * movement.speed * delta;
        position.y += Math.sin(movement.direction) * movement.speed * delta;
      }
    });
  }
}
```

Create World instance (main ECS context) and register systems:

```typescript
import { World } from './world';

const world = new World();
world.addSystem(MovementSystem);
```

Create new entity with Position and Movement components:

```typescript
const entity = world.createEntity();

const position = world.addComponent(entity, new Position());
position.x = 0;
position.y = 0;

const movement = world.addComponent(entity, new Movement());
movement.speed = 1;
movement.direction = 45;
```

Create game loop:

```typescript
import { Loop } from './game-loop';

new Loop((delta) => {
  world.update(delta);
}, 30);
```

## Support

**@ygnez/ecs** is an MIT-licensed open source project. It can grow only thanks to the support and sponsorship of earthlings. If you'd like to join them, please [write us](mailto:team@ygnez.com).

## License

@ygnez/ecs is [MIT licensed](LICENSE).
