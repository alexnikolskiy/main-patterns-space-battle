import { MoveCommand, Movable } from './move'
import Vector from "./types/vector"

describe('move', function () {
  it('should return new position (5, 8) when old position is (12, 5) and velocity is (-7, 3)', function () {
    const movableMock: Movable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn()
    }
    const position = new Vector(5, 8)
    const command = new MoveCommand(movableMock)

    command.execute()

    expect(movableMock.setPosition).toHaveBeenCalledWith(position)
  })

  it('should throw error when position cannot be read', function () {
    const movableMock: Movable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn(),
      setPosition: jest.fn()
    }
    const command = new MoveCommand(movableMock)

    expect(() => command.execute()).toThrowError()
  })

  it('should throw error when velocity cannot be read', function () {
    const movableMock: Movable = {
      getVelocity: jest.fn(),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn()
    }
    const command = new MoveCommand(movableMock)

    expect(() => command.execute()).toThrowError()
  })

  it('should throw error when position cannot be set', function () {
    const movableMock: Movable = {
      getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
      getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
      setPosition: jest.fn().mockImplementation(() => {
        throw new Error()
      })
    }
    const command = new MoveCommand(movableMock)

    expect(() => command.execute()).toThrowError()
  })
})