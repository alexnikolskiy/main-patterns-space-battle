export const queue: Command[] = []

interface ExceptionHandlerFunction {
  (command?: Command, exception?: Error): void
}

export class ExceptionHandler {
  private handlers = new Map<string, Map<string, ExceptionHandlerFunction>>()

  handle(command: Command, exception: Error) {
    const exceptions = this.handlers.get(command.constructor.name)
    if (!exceptions) {
      throw new Error('Unknown command')
    }

    const handler = exceptions.get(exception.constructor.name)
    if (!handler) {
      throw new Error('Unknown exception')
    }

    handler(command, exception)
  }

  register(commandType: string, exceptionType: string, handler: ExceptionHandlerFunction) {
    const exceptions = this.handlers.get(commandType) ?? new Map()
    exceptions.set(exceptionType, handler)
    this.handlers.set(commandType, exceptions)
  }
}

export class LogExceptionCommand implements Command {
  private readonly exception: Error

  constructor(exception: Error) {
    this.exception = exception
  }

  execute() {
    console.log(`Error: ${this.exception.message}`)
  }
}

export const logExceptionHandler: ExceptionHandlerFunction = (command, exception) => {
  if (!exception) {
    throw new Error('Exception is not defined')
  }
  const logExceptionCommand = new LogExceptionCommand(exception)
  queue.push(logExceptionCommand)
}

export class RepeatCommand implements Command {
  private readonly command: Command

  constructor(command: Command) {
    this.command = command
  }

  execute() {
    this.command.execute()
  }
}

export const repeatCommandHandler: ExceptionHandlerFunction = (command, exception) => {
  if (!command) {
    throw new Error('Command is not defined')
  }
  const repeatCommand = new RepeatCommand(command)
  queue.push(repeatCommand)
}

export class RepeatTwiceCommand implements Command {
  private readonly command: Command

  constructor(command: Command) {
    this.command = command
  }

  execute() {
    this.command.execute()
  }
}

export const repeatTwiceCommandHandler: ExceptionHandlerFunction = (command, exception) => {
  if (!command) {
    throw new Error('Command is not defined')
  }
  const repeatTwiceCommand = new RepeatTwiceCommand(command)
  queue.push(repeatTwiceCommand)
}

export const run = (exceptionHandler: ExceptionHandler, stopOnEmpty?: boolean) => {
  while (true) {
    if (stopOnEmpty && queue.length === 0) {
      break
    }

    const command = queue.shift()

    if (!command) {
      continue
    }

    try {
      command.execute()
    } catch (err) {
      if (err instanceof Error) {
        exceptionHandler.handle(command, err)
      } else {
        throw err
      }
    }
  }
}
