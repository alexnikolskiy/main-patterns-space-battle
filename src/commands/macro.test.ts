import { MacroCommand } from './macro'

describe('macro', function () {
  it('should execute all commands', function () {
    const command1: Command = {
      execute: jest.fn()
    }
    const command2: Command = {
      execute: jest.fn()
    }
    const macroCommand = new MacroCommand([command1, command2])

    macroCommand.execute()

    expect(command1.execute).toHaveBeenCalled()
    expect(command2.execute).toHaveBeenCalled()
  })

  it('should throw error when one of the commands throws a error', function () {
    const command1: Command = {
      execute: jest.fn().mockImplementation(() => { throw new Error()})
    }
    const command2: Command = {
      execute: jest.fn()
    }
    const macroCommand = new MacroCommand([command1, command2])

    expect(macroCommand.execute).toThrowError()
  })
})
