import Vector from "../types/vector"

export abstract class Movable {
  abstract getPosition(): Vector
  abstract setPosition(position: Vector): void
  abstract getVelocity(): Vector
}

export class MoveCommand implements Command {
  private movable: Movable

  constructor(movable: Movable) {
    this.movable = movable
  }

  public execute() {
    this.movable.setPosition(this.movable.getPosition().add(this.movable.getVelocity()))
  }
}
