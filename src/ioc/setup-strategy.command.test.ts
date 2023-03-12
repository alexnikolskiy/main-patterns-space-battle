import { SetupStrategyCommand } from './setup-strategy.command'
import { IoC } from "./ioc"

describe('setup-strategy command', function () {
  it('should setup strategy', function () {
    const strategy = () => ({})
    const command = new SetupStrategyCommand(strategy)
    const setStrategyMock = jest.fn()
    IoC.setStrategy = setStrategyMock

    command.execute()

    expect(setStrategyMock).toHaveBeenCalledWith(strategy)
  })
})