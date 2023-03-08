import { InitScopeCommand } from './init-scope.command'
import { ScopeStrategy } from "./scope-strategy"
import { IoC } from './ioc'
import { Scope } from "./scope"

describe('init-scope command', function () {
  const resolveOrigin = IoC.resolve
  const getRootOrigin = ScopeStrategy.getRoot
  const setRootOrigin = ScopeStrategy.setRoot

  afterEach(() => {
    IoC.resolve = resolveOrigin
    ScopeStrategy.getRoot = getRootOrigin
    ScopeStrategy.setRoot = setRootOrigin
  })

  it('should init scope', function () {
    const command = new InitScopeCommand()
    let rootScope: Scope | null = null
    const executeMock = jest.fn()
    const setupStrategyCommandMock: Command = { execute: executeMock }
    const resolveMock = jest.fn().mockReturnValue(setupStrategyCommandMock)
    const setRootMock = jest.fn().mockImplementation((scope: Scope) => { rootScope = scope })
    IoC.resolve = resolveMock
    ScopeStrategy.setRoot = setRootMock

    command.execute()

    expect(rootScope!.getDependencies().has('Scopes.Storage'))
    expect(rootScope!.getDependencies().has('Scopes.New'))
    expect(rootScope!.getDependencies().has('Scopes.Current'))
    expect(rootScope!.getDependencies().has('Scopes.Current.Set'))
    expect(rootScope!.getDependencies().has('IoC.Register'))
    expect(resolveMock).toHaveBeenCalledWith('IoC.Default')
    expect(resolveMock).toHaveBeenCalledWith('IoC.SetupStrategy', ScopeStrategy.resolve)
    expect(executeMock).toHaveBeenCalled()
  })

  it('should not init scope again', function () {
    const command = new InitScopeCommand()
    const setRootMock = jest.fn()
    const resolveMock = jest.fn()
    ScopeStrategy.getRoot = jest.fn().mockReturnValue({})
    ScopeStrategy.setRoot = setRootMock
    IoC.resolve = resolveMock

    command.execute()

    expect(setRootMock).not.toHaveBeenCalled()
    expect(resolveMock).not.toHaveBeenCalled()
  })
})