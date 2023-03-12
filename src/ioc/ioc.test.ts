import { IoC } from './ioc'
import { SetupStrategyCommand } from './setup-strategy.command'

const setupStrategyCommandMock = { execute: () => {} }
jest.mock('./setup-strategy.command', () => {
  return {
    SetupStrategyCommand: jest.fn().mockImplementation(() => {
      return setupStrategyCommandMock
    })
  }
})

describe('ioc', function () {
  beforeEach(() => {
    (SetupStrategyCommand as jest.Mock<SetupStrategyCommand>).mockClear()
  })

  it('should set strategy', function () {
    const strategy = jest.fn()

    IoC.setStrategy(strategy)

    expect(IoC['strategy']).toEqual(strategy)
  })

  it('should resolve', function () {
    const strategy = jest.fn()
    const key = 'some-key'
    const arg = {}
    IoC['strategy'] = strategy

    IoC.resolve(key, arg)

    expect(IoC['strategy']).toHaveBeenCalledWith(key, [arg])
  })

  it('should return setup strategy command on "IoC.SetupStrategy" key', function () {
    const strategyMock = jest.fn()

    const strategy = IoC['defaultStrategy']('IoC.SetupStrategy', [strategyMock])

    expect(SetupStrategyCommand).toHaveBeenCalled()
    expect(strategy).toEqual(setupStrategyCommandMock)
  })

  it('should return default strategy on "IoC.Default" key', function () {
    const strategy = IoC['defaultStrategy']('IoC.Default')

    expect(strategy).toEqual(IoC['defaultStrategy'])
  })

  it('should throw error on unknown key', function () {
    expect(() => IoC['defaultStrategy']('some key')).toThrowError()
  })
})