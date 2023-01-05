export default class Vector {
  public readonly x: number
  public readonly y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  public add(input: Vector): Vector {
    return new Vector(
      this.x + input.x,
      this.y + input.y,
    );
  }
}