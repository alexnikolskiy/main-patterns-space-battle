import { Scope } from './scope'
import { ScopeStrategy } from './scope-strategy'

export class SetupScopeCommand implements Command {
  constructor(private readonly scope: Scope) {}

  execute() {
    ScopeStrategy.setScope(this.scope)
  }
}