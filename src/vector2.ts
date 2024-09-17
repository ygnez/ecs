export class Vector2 {
  /**
   * Creates a new vector with coordinates (x, y).
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  constructor(public x: number = 0, public y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets both the x and y coordinates.
   * @param {number} x - The new x-coordinate.
   * @param {number} y - The new y-coordinate.
   */
  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds another vector to this vector.
   * @param {Vector2} vector - The vector to add.
   * @returns {Vector2} The resulting vector.
   */
  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  /**
   * Subtracts another vector from this vector.
   * @param {Vector2} vector - The vector to subtract.
   * @returns {Vector2} The resulting vector.
   */
  sub(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  /**
   * Multiplies this vector by a scalar.
   * @param {number} scalar - The scalar to multiply by.
   * @returns {Vector2} The resulting vector.
   */
  mul(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * Divides this vector by a scalar.
   * @param {number} scalar - The scalar to divide by.
   * @returns {Vector2} The resulting vector.
   */
  div(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param {Vector2} vector - The other vector.
   * @returns {number} The dot product.
   */
  dot(vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Calculates the cross product of this vector and another vector.
   * @param {Vector2} vector - The other vector.
   * @returns {number} The cross product.
   */
  cross(vector: Vector2): number {
    return this.x * vector.x - this.y * vector.y;
  }

  /**
   * Calculates the magnitude (length) of this vector.
   * @returns {number} The magnitude of the vector.
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normalizes this vector (makes it have a magnitude of 1).
   * @returns {Vector2} The normalized vector.
   */
  normalize(): Vector2 {
    const mag = this.magnitude();
    return new Vector2(this.x / mag, this.y / mag);
  }

  /**
   * Creates a copy of this vector.
   * @returns {Vector2} The cloned vector.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param {Vector2} vector - The other vector.
   * @returns {boolean} True if the vectors are equal, false otherwise.
   */
  equals(vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  /**
   * Returns a string representation of this vector.
   * @returns {string} The string representation of the vector.
   */
  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  /**
   * Calculates the distance to another vector.
   * @param {Vector2} vector - The other vector.
   * @returns {number} The distance to the other vector.
   */
  distance(vector: Vector2): number {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculates the angle of this vector relative to the positive X-axis.
   * @returns {number} The angle in radians.
   */
  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotates this vector by a given angle.
   * @param {number} angle - The angle to rotate by in radians.
   * @returns {Vector2} The rotated vector.
   */
  rotate(angle: number): Vector2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos,
    );
  }

  /**
   * Performs linear interpolation between this vector and another vector.
   * @param {Vector2} vector - The other vector.
   * @param {number} t - The interpolation factor (between 0 and 1).
   * @returns {Vector2} The interpolated vector.
   */
  lerp(vector: Vector2, t: number): Vector2 {
    return new Vector2(
      this.x + t * (vector.x - this.x),
      this.y + t * (vector.y - this.y),
    );
  }
}
