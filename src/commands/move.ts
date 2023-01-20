import Vector from "../types/vector"

export interface Movable {
  getPosition(): Vector
  setPosition(position: Vector): void
  getVelocity(): Vector
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
