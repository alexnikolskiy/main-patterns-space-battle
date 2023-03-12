import { NewScopeCommand } from './new-scope.command'
import { IoC } from './ioc'
import { ScopeStrategy } from './scope-strategy'

describe('new-scope command', function () {
  const setScopeOrigin = ScopeStrategy.setScope

  afterEach(() => {
    ScopeStrategy.setScope = setScopeOrigin
  })

  it('should create new scope', function () {
    const key = 'some-scope'
    const command = new NewScopeCommand(key)
    const scopeMocked = { resolve: jest.fn() }
    const setScopeMocked = jest.fn()
    const dependencies = new Map()
    const scope = { dependencies, parent: scopeMocked }
    IoC.resolve = jest.fn().mockReturnValueOnce(dependencies).mockReturnValueOnce(scopeMocked)
    ScopeStrategy.setScope = setScopeMocked

    command.execute()

    expect(setScopeMocked).toHaveBeenCalledWith(key, scope)
  })
})