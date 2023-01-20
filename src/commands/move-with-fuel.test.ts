import { MoveWithFuel } from './move-with-fuel'
import { Movable } from './move'
import { FuelBurnable } from './fuel'
import Vector from "../types/vector"
import { CommandException } from '../exception'

describe('Move with fuel', function () {
  it('should move with fuel', function () {
    const movableAndFuelBurnableMock: Movable & FuelBurnable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn(),
      getFuelConsumption: jest.fn().mockReturnValue(1),
      getFuelLevel: jest.fn().mockReturnValue(1),
      setFuelLevel: jest.fn()
    }
    const moveWithFuelCommand = new MoveWithFuel(movableAndFuelBurnableMock)

    moveWithFuelCommand.execute()

    expect(movableAndFuelBurnableMock.setPosition).toHaveBeenCalledWith(new Vector(5, 8))
    expect(movableAndFuelBurnableMock.setFuelLevel).toHaveBeenCalledWith(0)
  })

  it('should throw error when fuel is not enough', function () {
    const movableAndFuelBurnableMock: Movable & FuelBurnable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn(),
      getFuelConsumption: jest.fn().mockReturnValue(1),
      getFuelLevel: jest.fn().mockReturnValue(0),
      setFuelLevel: jest.fn()
    }
    const moveWithFuelCommand = new MoveWithFuel(movableAndFuelBurnableMock)

    expect(() => { moveWithFuelCommand.execute() }).toThrow(CommandException)
  })
})