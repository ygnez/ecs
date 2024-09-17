/**
 * Random integer number between x1 and x2.
 *
 * @param x1
 * @param x2
 */
export function random(x1: number, x2: number): number {
  if (x1 === x2) return x1;

  const min = Math.floor(Math.min(x1, x2));
  const max = Math.ceil(Math.max(x1, x2));

  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * # Composite intersection type
 *
 * One set contains all items from another.
 *
 * @param a
 * @param b
 */
export function hasAll<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of b) {
    if (!a.has(item)) {
      return false;
    }
  }

  return true;
}

/**
 * # Intersection union type
 *
 * One set contains some items from another.
 *
 * @param a
 * @param b
 */
export function hasSome<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of b) {
    if (a.has(item)) {
      return true;
    }
  }

  return false;
}

/**
 * # Equivalent intersection type
 *
 * Both sets are equal.
 *
 * @param a
 * @param b
 */
export function equals<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of b) {
    if (!a.has(item)) {
      return false;
    }
  }

  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }

  return true;
}
