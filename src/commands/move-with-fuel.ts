import { MoveCommand, Movable } from './move'
import { CheckFuelCommand, BurnFuelCommand, FuelBurnable } from './fuel'
import { MacroCommand } from './macro'

export class MoveWithFuel implements Command {
  private readonly object: Movable & FuelBurnable

  constructor(object: Movable & FuelBurnable) {
    this.object = object
  }

  execute() {
    const checkFuelCommand = new CheckFuelCommand(this.object)
    const burnFuelCommand = new BurnFuelCommand(this.object)
    const moveCommand = new MoveCommand(this.object)
    const macroCommand = new MacroCommand([checkFuelCommand, moveCommand, burnFuelCommand])

    macroCommand.execute()
  }
}