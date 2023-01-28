import { run, queue } from './main'
import { ExceptionHandler } from './exception'

describe('run', function () {
  beforeEach(() => {
    queue.splice(0, queue.length)
  })

  it('should not execute commands when queue is empty', function () {
    const executeMock = jest.fn()
    const customCommandMock: Command = {
      execute: executeMock
    }
    const exceptionHandler = new ExceptionHandler()
    queue.push(customCommandMock)
    const originalShift = Array.prototype.shift
    Array.prototype.shift = jest.fn().mockImplementation(function () {
      queue.splice(0, queue.length)
      return undefined
    })

    run(exceptionHandler, true)

    expect(executeMock).not.toHaveBeenCalled()
    Array.prototype.shift = originalShift
  })

  it('should throw error when catch error is not instance of Error', function () {
    const executeMock = jest.fn().mockImplementation(() => { throw 'error'})
    const customCommandMock: Command = {
      execute: executeMock
    }
    const exceptionHandler = new ExceptionHandler()
    queue.push(customCommandMock)

    expect(executeMock).not.toHaveBeenCalled()
    expect(() => { run(exceptionHandler, true) }).toThrowError('error')
  })
})
