export class MacroCommand implements Command {
  private commands: Command[]

  constructor(commands: Command[]) {
    this.commands = commands
  }

  execute() {
    this.commands.forEach((command) => {
      command.execute()
    })
  }
}