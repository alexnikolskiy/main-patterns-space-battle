import { RepeatCommand } from './repeat'
import { queue } from '../main'
import { MacroCommand } from "./macro"

describe('repeat', function () {
  beforeEach(() => {
    queue.splice(0, queue.length)
  })

  it('should add to queue command', function () {
    const mockExecute = jest.fn()
    const command: Command = {
      execute: mockExecute
    }
    const queueCommand = new RepeatCommand(command)

    queueCommand.execute()

    expect(queue).toHaveLength(1)
    expect(queue[0]).toBeInstanceOf(MacroCommand)

    queue[0].execute()

    expect(queue).toHaveLength(2)
    expect(mockExecute).toHaveBeenCalled()
  })
})