import { MoveWithFuel } from './move-with-fuel'
import { RepeatCommand } from './repeat'
import { Movable } from './move'
import { FuelBurnable } from './fuel'
import { MacroCommand } from './macro'

export class MoveInStraightCommand implements Command {
  private readonly object: Movable & FuelBurnable

  constructor(object: Movable & FuelBurnable) {
    this.object = object
  }

  execute() {
    const moveWithFuelCommand = new MoveWithFuel(this.object)
    const repeatCommand = new RepeatCommand(moveWithFuelCommand)
    const macroCommand = new MacroCommand([moveWithFuelCommand, repeatCommand])

    macroCommand.execute()
  }
}