import { GetCurrentScopeCommand } from './get-current-scope.command'
import { ScopeStrategy } from './scope-strategy'

describe('get-current-scope command', function () {
  const defaultScopeOrigin = ScopeStrategy.defaultScope
  const getCurrentScopeOrigin = ScopeStrategy.getCurrentScope

  afterEach(() => {
    ScopeStrategy.defaultScope = defaultScopeOrigin
    ScopeStrategy.getCurrentScope = getCurrentScopeOrigin
  })

  it('should return current scope', function () {
    const scopeMocked = { resolve: jest.fn() }
    const getCurrentScopeMocked = jest.fn().mockReturnValue(scopeMocked)
    ScopeStrategy.getCurrentScope = getCurrentScopeMocked
    const command = new GetCurrentScopeCommand()

    const scope = command.execute()

    expect(getCurrentScopeMocked).toHaveBeenCalled()
    expect(scope).toEqual(scopeMocked)
  })

  it('should return default scope when current scope is not defined', function () {
    const getCurrentScopeMocked = jest.fn().mockReturnValue(null)
    const scopeMocked = { resolve: jest.fn() }
    const defaultScopeMocked = jest.fn().mockReturnValue(scopeMocked)
    ScopeStrategy.getCurrentScope = getCurrentScopeMocked
    ScopeStrategy.defaultScope = defaultScopeMocked
    const command = new GetCurrentScopeCommand()

    const scope = command.execute()

    expect(defaultScopeMocked).toHaveBeenCalled()
    expect(scope).toEqual(scopeMocked)
  })
})