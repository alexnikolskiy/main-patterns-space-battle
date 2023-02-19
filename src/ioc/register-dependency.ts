import { Resolver } from "./scope"
import { ScopeStrategy } from './scope-strategy'

export class RegisterDependencyCommand implements Command {
  constructor(private readonly key: string, private readonly strategy: Resolver) {}

  execute() {
    if (!ScopeStrategy.getScope()?.getDependencies().set(this.key, this.strategy)) {
      throw new Error('Failed to register dependency')
    }
  }
}