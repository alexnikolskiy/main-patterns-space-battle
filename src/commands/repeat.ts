import { MacroCommand } from './macro'
import { queue } from '../main'

export class RepeatCommand implements Command {
  private command: Command

  constructor(command: Command) {
    this.command = command
  }

  execute() {
    const macroCommand = new MacroCommand([this.command, new RepeatCommand(this.command)])
    queue.push(macroCommand)
  }
}