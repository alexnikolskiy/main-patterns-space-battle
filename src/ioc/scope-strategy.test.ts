import { ScopeStrategy } from './scope-strategy'
import { Resolver, Scope } from './scope'

describe('ScopeStrategy', function () {
  let scopeMocked: Scope

  beforeEach(() => {
    const dependencies = new Map<string, Resolver>()
    const parentScope = { resolve: jest.fn() }
    scopeMocked = new Scope(dependencies, parentScope)
    scopeMocked.resolve = jest.fn()
  })

  it('should get root', function () {
    ScopeStrategy['root'] = scopeMocked

    const root = ScopeStrategy.getRoot()

    expect(root).toEqual(scopeMocked)
  })

  it('should set root', function () {
    ScopeStrategy.setRoot(scopeMocked)

    expect(ScopeStrategy['root']).toEqual(scopeMocked)
  })

  it('should get current scope', function () {
    ScopeStrategy['currentScope'] = scopeMocked

    const currentScope = ScopeStrategy.getCurrentScope()

    expect(currentScope).toEqual(scopeMocked)
  })

  it('should set current scope', function () {
    ScopeStrategy.setCurrentScope(scopeMocked)

    expect(ScopeStrategy['currentScope']).toEqual(scopeMocked)
  })

  it('should get scope', function () {
    const key = 'some-key'
    ScopeStrategy['scopes'].set(key, scopeMocked)

    const scope = ScopeStrategy.getScope(key)

    expect(scope).toEqual(scopeMocked)
  })

  it('should set scope', function () {
    const key = 'some-key'

    ScopeStrategy.setScope(key, scopeMocked)

    expect(ScopeStrategy['scopes'].get(key)).toEqual(scopeMocked)
  })

  it('should resolve root on "Scopes.Root" key', function () {
    ScopeStrategy['root'] = scopeMocked

    ScopeStrategy.resolve('Scopes.Root')

    expect(ScopeStrategy['root']).toEqual(scopeMocked)
  })

  it('should resolve on current scope when key id not "Scopes.Root"', function () {
    const key = 'some-key'
    const args: object[] = []
    ScopeStrategy['root'] = scopeMocked

    ScopeStrategy.resolve(key, args)

    expect(scopeMocked.resolve).toHaveBeenCalledWith(key, args)
  })

  afterEach(() => {
    ScopeStrategy['root'] = null
    ScopeStrategy['currentScope'] = null
    ScopeStrategy['scopes'].clear()
  })
})