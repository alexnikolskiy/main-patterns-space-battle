import { ScopeStrategy } from './scope-strategy'

export class SetupCurrentScopeCommand implements Command {
  constructor(private readonly key: string) {}

  execute() {
    const scope = ScopeStrategy.getScope(this.key)
    if (!scope) {
      throw new Error(`Unknown IoC scope ${this.key}`)
    }
    ScopeStrategy.setCurrentScope(scope)
  }
}