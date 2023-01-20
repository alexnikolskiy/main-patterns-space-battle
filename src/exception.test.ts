import {
  ExceptionHandler,
  LogExceptionCommand,
  logExceptionHandler,
  RepeatCommand,
  repeatCommandHandler,
  RepeatTwiceCommand,
  repeatTwiceCommandHandler
} from './exception'
import { run, queue } from './main'

describe('exceptions', function () {
  let customCommand: Command
  let customCommandType: string
  let customError: Error
  let customErrorType: string

  beforeAll(() => {
    class CustomError extends Error {
      constructor(message?: string) {
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
      }
    }

    customError = new CustomError('Custom error')
    customErrorType = CustomError.name

    class CustomCommand implements Command {
      execute() {
        throw customError
      }
    }

    customCommand = new CustomCommand()
    customCommandType = CustomCommand.name
  })

  beforeEach(() => {
    queue.splice(0, queue.length)
  })

  describe('log', function () {
    it('should add logs when command execute', function () {
      const consoleMock = jest.fn()
      console.log = consoleMock
      const errorMessage = 'some error'
      const error = new Error('some error')
      const command = new LogExceptionCommand(error)

      command.execute()

      expect(consoleMock).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
    })

    it('should add command to the queue when exception handler execute', function () {
      const error = new Error('some error')
      console.log = jest.fn()

      logExceptionHandler(undefined, error)

      expect(queue).toHaveLength(1)
      expect(queue[0]).toBeInstanceOf(LogExceptionCommand)
    })

    it('should throw error when exception is not defined', function () {
      expect(() => logExceptionHandler()).toThrowError()
    })
  })

  describe('repeat', function () {
    it('should execute command when repeat command execute', function () {
      const executeMock = jest.fn()
      const customCommandMock: Command = {
        execute: executeMock
      }
      const command = new RepeatCommand(customCommandMock)

      command.execute()

      expect(executeMock).toHaveBeenCalled()
    })

    it('should add command to the queue when exception handler execute', function () {
      const customCommandMock: Command = {
        execute: jest.fn()
      }

      repeatCommandHandler(customCommandMock, undefined)

      expect(queue).toHaveLength(1)
      expect(queue[0]).toBeInstanceOf(RepeatCommand)
    })

    it('should throw error when command is not defined', function () {
      expect(() => repeatCommandHandler()).toThrowError()
    })
  })

  describe('repeat twice', function () {
    it('should execute command when repeat twice command execute', function () {
      const executeMock = jest.fn()
      const customCommandMock: Command = {
        execute: executeMock
      }
      const command = new RepeatTwiceCommand(customCommandMock)

      command.execute()

      expect(executeMock).toHaveBeenCalled()
    })

    it('should add command to the queue when exception handler execute', function () {
      const customCommandMock: Command = {
        execute: jest.fn()
      }

      repeatTwiceCommandHandler(customCommandMock, undefined)

      expect(queue).toHaveLength(1)
      expect(queue[0]).toBeInstanceOf(RepeatTwiceCommand)
    })

    it('should throw error when command is not defined', function () {
      expect(() => repeatTwiceCommandHandler()).toThrowError()
    })
  })

  describe('repeat + log', function () {
    it('should first repeat command and then log error', function () {
      const exceptionHandler = new ExceptionHandler()
      exceptionHandler.register(customCommandType, customErrorType, repeatCommandHandler)
      exceptionHandler.register(RepeatCommand.name, customErrorType, logExceptionHandler)
      const customCommandSpy = jest.spyOn(customCommand, 'execute')
      queue.push(customCommand)

      run(exceptionHandler, true)

      expect(customCommandSpy).toHaveBeenCalledTimes(2)
      expect(customCommandSpy.mock.results[0].value).toEqual(customError)
      expect(customCommandSpy.mock.results[1].value).toEqual(customError)
    })
  })

  describe('repeat twice + log', function () {
    it('should first repeat command twice and then log error', function () {
      const exceptionHandler = new ExceptionHandler()
      exceptionHandler.register(customCommandType, customErrorType, repeatCommandHandler)
      exceptionHandler.register(RepeatCommand.name, customErrorType, repeatTwiceCommandHandler)
      exceptionHandler.register(RepeatTwiceCommand.name, customErrorType, logExceptionHandler)
      const customCommandSpy = jest.spyOn(customCommand, 'execute')
      queue.push(customCommand)

      run(exceptionHandler, true)

      expect(customCommandSpy).toHaveBeenCalledTimes(3)
      expect(customCommandSpy.mock.results[0].value).toEqual(customError)
      expect(customCommandSpy.mock.results[1].value).toEqual(customError)
      expect(customCommandSpy.mock.results[2].value).toEqual(customError)
    })
  })

  describe('ExceptionHandler', function () {
    it('should throw Error when handle unknown command', function () {
      const exceptionHandler = new ExceptionHandler()

      expect(() => { exceptionHandler.handle(customCommand, customError) }).toThrowError()
    })

    it('should throw Error when handle unknown exception', function () {
      const exceptionHandler = new ExceptionHandler()
      exceptionHandler.register(customCommandType, customErrorType, repeatCommandHandler)

      expect(() => { exceptionHandler.handle(customCommand, new Error()) }).toThrowError()
    })
  })
})