import { RotateCommand, Rotatable } from './rotate'

describe('rotate', function () {
  it('should return new direction 5 (180°) when current direction is 1 (0°), directions number is 8 and angular velocity is Pi rad.', function () {
    const rotatableMock: Rotatable = {
      getDirection: jest.fn().mockReturnValue(1),
      setDirection: jest.fn(),
      getAngularVelocity: jest.fn().mockReturnValue(Math.PI),
      getDirectionsNumber: jest.fn().mockReturnValue(8)
    }
    const command = new RotateCommand(rotatableMock)

    command.execute()

    expect(rotatableMock.setDirection).toHaveBeenCalledWith(5)
  })
})