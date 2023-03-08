import { IoC, Strategy } from './ioc'
import { Resolver, Scope, LeafScope } from './scope'
import { SetupCurrentScopeCommand } from './setup-current-scope.command'
import { RegisterDependencyCommand } from './register-dependency.command'
import { GetCurrentScopeCommand } from './get-current-scope.command'
import { NewScopeCommand } from './new-scope.command'
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
      return new NewScopeCommand(args[0] as unknown as string)
    })

    dependencies.set('Scopes.Current', () => {
      return new GetCurrentScopeCommand()
    })

    dependencies.set('Scopes.Current.Set', (args) => {
      return new SetupCurrentScopeCommand(args[0] as unknown as string)
    })

    dependencies.set('IoC.Register', (args) => {
      return new RegisterDependencyCommand(args[0] as unknown as string, args[1] as Resolver)
    })

    ScopeStrategy.setRoot(scope)

    IoC.resolve<Command>('IoC.SetupStrategy', ScopeStrategy.resolve).execute()
  }
}