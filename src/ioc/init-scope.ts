import { IoC, Strategy } from './ioc'
import { Resolver, Scope, LeafScope } from './scope'
import { SetupScopeCommand } from './setup-scope'
import { RegisterDependencyCommand } from './register-dependency'
import { ScopeStrategy } from './scope-strategy'

export class InitScopeCommand implements Command {
  execute() {
    if (ScopeStrategy.getRoot() !== null) {
      return
    }

    const dependencies = new Map<string, Resolver>()
    const scope = new Scope(
      dependencies,
      new LeafScope(IoC.resolve<Strategy>('IoC.Default'))
    )

    dependencies.set('Scopes.Storage', () => {
      return new Map<string, Resolver>()
    })

    dependencies.set('Scopes.New', (args) => {
      return new Scope(
        IoC.resolve<Map<string, Resolver>>('Scopes.Storage'),
        args[0] as Scope
      )
    })

    dependencies.set('Scopes.Get', () => {
      const scope = ScopeStrategy.getScope()

      return scope ?? ScopeStrategy.defaultScope
    })

    dependencies.set('Scopes.Set', (args) => {
      return new SetupScopeCommand(args[0] as Scope)
    })

    dependencies.set('IoC.Register', (args) => {
      return new RegisterDependencyCommand(args[0] as unknown as string, args[1] as Resolver)
    })

    ScopeStrategy.setRoot(scope)

    IoC.resolve<Command>('IoC.SetupStrategy', ScopeStrategy.resolve)

    new SetupScopeCommand(scope).execute()
  }
}