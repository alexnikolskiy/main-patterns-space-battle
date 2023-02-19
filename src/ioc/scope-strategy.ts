import { Scope } from './scope'

export class ScopeStrategy {
  private static root: Scope | null = null
  private static scope: Scope | null = null
  public static defaultScope = () => this.root

  public static getRoot() {
    return this.root
  }

  public static setRoot(scope: Scope) {
    this.root = scope
  }

  public static getScope() {
    return this.scope
  }

  public static setScope(scope: Scope) {
    this.scope = scope
  }

  public static resolve(key: string, args: object[]): object {
    if (key === 'Scopes.Root') {
      return this.root as Scope
    } else {
      if (this.scope === null) {
        this.scope = this.defaultScope() as Scope
      }

      return this.scope.resolve(key, args)
    }
  }
}