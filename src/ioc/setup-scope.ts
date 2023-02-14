import { IScope } from './scope'
import { IoC } from './ioc'

export class SetupScopeCommand implements Command {
  constructor(private readonly scope: IScope) {}

  execute() {
    IoC.setScope(this.scope)
  }
}