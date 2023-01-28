import { MoveInStraightCommand } from './move-in-straight'
import { Movable } from './move'
import { FuelBurnable } from './fuel'
import Vector from "../types/vector"
import { CommandException } from '../exception'
import { queue } from '../main'

describe('Move in a straight', function () {
  it('should ', function () {
    const movableAndFuelBurnableMock: Movable & FuelBurnable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn(),
      getFuelConsumption: jest.fn().mockReturnValue(1),
      getFuelLevel: jest.fn()
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(0),
      setFuelLevel: jest.fn()
    }
    const moveInStraightCommand = new MoveInStraightCommand(movableAndFuelBurnableMock)

    moveInStraightCommand.execute()
    queue[0].execute()

    expect(() => { queue[1].execute() }).toThrow(CommandException)
  })
})