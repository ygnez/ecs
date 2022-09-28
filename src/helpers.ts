/**
 * Get random integer value from min to max.
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
