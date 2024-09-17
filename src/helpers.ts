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
