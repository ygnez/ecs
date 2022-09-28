import { ComponentClass } from './component';

export type Entity = number;

export interface EntityPreset {
  name: string;
  components: ComponentClass[];
}
