import { CommandException } from '../exception'

export interface FuelBurnable {
  getFuelLevel(): number
  setFuelLevel(fuelLevel: number): void
  getFuelConsumption(): number
}


export class CheckFuelCommand implements Command {
  private fuelBurnable: FuelBurnable

  constructor(fuelBurnable: FuelBurnable) {
    this.fuelBurnable = fuelBurnable
  }

  execute() {
    const nextFuelLevel = this.fuelBurnable.getFuelLevel() - this.fuelBurnable.getFuelConsumption()
    if (nextFuelLevel < 0) {
      throw new CommandException()
    }
  }
}

export class BurnFuelCommand implements Command {
  private fuelBurnable: FuelBurnable

  constructor(fuelBurnable: FuelBurnable) {
    this.fuelBurnable = fuelBurnable
  }

  execute() {
    const nextFuelLevel = this.fuelBurnable.getFuelLevel() - this.fuelBurnable.getFuelConsumption()
    this.fuelBurnable.setFuelLevel(nextFuelLevel)
  }
}