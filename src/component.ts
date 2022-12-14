import { v4 as uuid4 } from 'uuid';

export type ComponentClass<C extends Component = Component> = new (
  ...args: any[]
) => C;

export class Component {
  public readonly $id: string;

  constructor() {
    this.$id = uuid4();
  }
}
