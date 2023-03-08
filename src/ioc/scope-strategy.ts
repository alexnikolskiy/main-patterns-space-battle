import { Scope } from './scope'

export class ScopeStrategy {
  private static root: Scope | null = null
  private static currentScope: Scope | null = null
  private static scopes: Map<string, Scope> = new Map()
  public static defaultScope = () => this.root

  public static getRoot(): Scope | null {
    return this.root
  }

  public static setRoot(scope: Scope) {
    this.root = scope
  }

  public static getCurrentScope(): Scope | null {
    return this.currentScope
  }

  public static setCurrentScope(scope: Scope) {
    this.currentScope = scope
  }

  public static getScope(key: string): Scope | undefined {
    return this.scopes.get(key)
  }

  public static setScope(key: string, scope: Scope) {
    this.scopes.set(key, scope)
  }

  public static resolve(key: string, args?: object[]): object {
    if (key === 'Scopes.Root') {
      return this.root as Scope
    } else {
      if (this.currentScope === null) {
        this.currentScope = this.defaultScope() as Scope
      }

      return this.currentScope.resolve(key, args!)
    }
  }
}