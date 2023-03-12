import { Scope } from './scope'

export class ScopeStrategy {
  private static root: Scope | null = null
  private static currentScope: Scope | null = null
  private static scopes: Map<string, Scope> = new Map()
  public static defaultScope = () => ScopeStrategy.root

  public static getRoot(): Scope | null {
    return ScopeStrategy.root
  }

  public static setRoot(scope: Scope) {
    ScopeStrategy.root = scope
  }

  public static getCurrentScope(): Scope | null {
    return ScopeStrategy.currentScope
  }

  public static setCurrentScope(scope: Scope) {
    ScopeStrategy.currentScope = scope
  }

  public static getScope(key: string): Scope | undefined {
    return ScopeStrategy.scopes.get(key)
  }

  public static setScope(key: string, scope: Scope) {
    ScopeStrategy.scopes.set(key, scope)
  }

  public static resolve(key: string, args?: object[]): object {
    if (key === 'Scopes.Root') {
      return ScopeStrategy.root as Scope
    } else {
      if (ScopeStrategy.currentScope === null) {
        ScopeStrategy.currentScope = ScopeStrategy.defaultScope() as Scope
      }

      return ScopeStrategy.currentScope.resolve(key, args!)
    }
  }
}