import { SetupCurrentScopeCommand } from './setup-current-scope.command'
import { ScopeStrategy } from './scope-strategy'

describe('setup-current-scope command', function () {
  const getScopeOrigin = ScopeStrategy.getScope
  const getCurrentScopeOrigin = ScopeStrategy.getCurrentScope

  afterEach(() => {
    ScopeStrategy.getScope = getScopeOrigin
    ScopeStrategy.getCurrentScope = getCurrentScopeOrigin
  })

  it('should setup current scope', function () {
    const key = 'some-key'
    const command = new SetupCurrentScopeCommand(key)
    const scope = { resolve: jest.fn() }
    const getScopeMock = jest.fn().mockReturnValue(scope)
    const setCurrentScopeMock = jest.fn()
    ScopeStrategy.getScope = getScopeMock
    ScopeStrategy.setCurrentScope = setCurrentScopeMock

    command.execute()

    expect(getScopeMock).toHaveBeenCalledWith(key)
    expect(setCurrentScopeMock).toHaveBeenCalledWith(scope)
  })

  it('should throw error when scope is not found by key', function () {
    const key = 'some-key'
    const command = new SetupCurrentScopeCommand(key)
    ScopeStrategy.getScope = jest.fn().mockReturnValue(undefined)

    expect(() => command.execute()).toThrowError()
  })
})