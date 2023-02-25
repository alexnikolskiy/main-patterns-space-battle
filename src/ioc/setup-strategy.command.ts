import { Strategy, IoC } from './ioc'

export class SetupStrategyCommand implements Command {
  constructor(private readonly strategy: Strategy ) {}

  execute() {
    IoC.setStrategy(this.strategy)
  }
}