import { Scope, LeafScope, Resolver, IScope } from './scope'

describe('LeafScope', function () {
  it('should resolve', function () {
    const mockStrategy = jest.fn()
    const leafScope = new LeafScope(mockStrategy)
    const key = 'some-key'
    const args: object[] = []

    leafScope.resolve(key, args)

    expect(mockStrategy).toHaveBeenCalledWith(key, args)
  })
})

describe('Scope', function () {
  it('should get dependencies', function () {
    const mockDeps = new Map<string, Resolver>()
    const mockParent: IScope = { resolve: jest.fn() }
    const scope = new Scope(mockDeps, mockParent)

    const deps = scope.getDependencies()

    expect(deps).toEqual(mockDeps)
  })

  it('should resolve if key exists in deps', function () {
    const key = 'some-key'
    const mockDeps = new Map<string, Resolver>()
    const mockResolve = jest.fn()
    const mockParent: IScope = { resolve: mockResolve }
    const mockResolver = jest.fn()
    mockDeps.set(key, mockResolver)
    const scope = new Scope(mockDeps, mockParent)
    const args: object[] = []

    scope.resolve(key, args)

    expect(mockResolver).toHaveBeenCalledWith(args)
  })

  it('should resolve on parent if key does not exist', function () {
    const key = 'some-key'
    const mockDeps = new Map<string, Resolver>()
    const mockResolve = jest.fn()
    const mockParent: IScope = { resolve: mockResolve }
    const scope = new Scope(mockDeps, mockParent)
    const args: object[] = []

    scope.resolve(key, args)

    expect(mockResolve).toHaveBeenCalledWith(key, args)
  })
})