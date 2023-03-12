import { Resolver, Scope } from './scope'
import { ScopeStrategy } from './scope-strategy'
import { IoC } from "./ioc"

export class NewScopeCommand implements Command {
  constructor(private key: string) {}

  execute() {
    const scope = new Scope(
      IoC.resolve<Map<string, Resolver>>('Scopes.Storage'),
      IoC.resolve<Scope>('Scopes.Current'),
    )
    ScopeStrategy.setScope(this.key, scope)
  }
}
