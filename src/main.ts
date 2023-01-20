import { ExceptionHandler } from './exception'

export const queue: Command[] = []

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
