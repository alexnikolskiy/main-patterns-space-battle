export interface Rotatable {
  getDirection(): number
  setDirection(direction: number): void
  getAngularVelocity(): number
  getDirectionsNumber(): number
}

export class RotateCommand implements Command {
  private rotatable: Rotatable

  constructor(rotatable: Rotatable) {
    this.rotatable = rotatable
  }

  execute() {
    this.rotatable.setDirection(Math.ceil(
      (this.rotatable.getDirection() + this.rotatable.getAngularVelocity()) % this.rotatable.getDirectionsNumber()
    ))
  }
}
