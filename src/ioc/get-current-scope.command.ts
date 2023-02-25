import { ScopeStrategy } from './scope-strategy'

export class GetCurrentScopeCommand implements Command {
  execute() {
    const scope = ScopeStrategy.getCurrentScope()

    return scope ?? ScopeStrategy.defaultScope
  }
}
