import { RegisterDependencyCommand } from './register-dependency.command'
import { ScopeStrategy } from './scope-strategy'

describe('register-dependency command', function () {
  const getCurrentScopeOrigin = ScopeStrategy.getCurrentScope

  afterEach(() => {
    ScopeStrategy.getCurrentScope = getCurrentScopeOrigin
  })

  it('should rigster dependency', function () {
    const key = 'some-key'
    const resolver = jest.fn()
    const command = new RegisterDependencyCommand(key, resolver)
    const dependencies = new Map()
    const parentScope = { resolve: jest.fn() }
    const getDependenciesMock = jest.fn().mockReturnValue(dependencies)
    const currentScope = { dependencies, parent: parentScope, getDependencies: getDependenciesMock }
    ScopeStrategy.getCurrentScope = jest.fn().mockReturnValue(currentScope)

    command.execute()

    expect(ScopeStrategy.getCurrentScope).toHaveBeenCalled()
    expect(getDependenciesMock).toHaveBeenCalled()
    expect(dependencies.has(key)).toBeTruthy()
  })

  it('should throw error when current scope in not defined', function () {
    const key = 'some-key'
    const resolver = jest.fn()
    const command = new RegisterDependencyCommand(key, resolver)
    ScopeStrategy.getCurrentScope = jest.fn().mockReturnValue(null)

    expect(command.execute).toThrowError()
  })
})