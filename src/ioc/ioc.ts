import { SetupStrategyCommand } from './setup-strategy.command'

export type Strategy = (key: string, args?: (object | string)[]) => object

export class IoC {
  private static strategy: Strategy = IoC.defaultStrategy

  public static setStrategy(strategy: Strategy) {
    IoC.strategy = strategy
  }

  public static resolve<T>(key: string, ...args: (object | string)[]): T {
    return IoC.strategy(key, args) as T
  }

  private static defaultStrategy(key: string, args?: (object | string)[]) {
    switch (key) {
      case 'IoC.SetupStrategy':
        return new SetupStrategyCommand(args![0] as Strategy)
      case 'IoC.Default':
        return IoC.defaultStrategy
      default:
        throw new Error(`Unknown IoC dependency ${key}`)
    }
  }
}