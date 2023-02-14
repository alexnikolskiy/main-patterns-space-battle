import { IoC } from './ioc'
import { Resolver } from './scope'

export class InitScopeCommand implements Command {
  execute() {
    IoC.resolve<Command>('IoC.Register', [
      'Scopes.Storage',
      (args: object[]) => new Map<string, Resolver>()
    ]).execute()
  }
}