import { FuelBurnable, BurnFuelCommand, CheckFuelCommand, CommandException } from './fuel'

describe('fuel', function () {
  it('should burn fuel if it enough', function () {
    const fuelBurnableMock: FuelBurnable = {
      getFuelConsumption: jest.fn().mockReturnValue(1),
      getFuelLevel: jest.fn().mockReturnValue(1),
      setFuelLevel: jest.fn()
    }
    const command = new BurnFuelCommand(fuelBurnableMock)

    command.execute()

    expect(fuelBurnableMock.setFuelLevel).toHaveBeenCalledWith(0)
  })

  it('should throw error when fuel level is low', function () {
    const fuelBurnableMock: FuelBurnable = {
      getFuelConsumption: jest.fn().mockReturnValue(1),
      getFuelLevel: jest.fn().mockReturnValue(0),
      setFuelLevel: jest.fn()
    }
    const command = new CheckFuelCommand(fuelBurnableMock)

    expect(() => { command.execute() }).toThrowError(CommandException)
  })
})