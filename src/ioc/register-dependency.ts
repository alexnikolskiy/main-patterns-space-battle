import { Strategy } from './ioc'

export class RegisterDependencyCommand implements Command {
  constructor(private readonly key: string, private readonly strategy: Strategy) {}

  execute() {

  }
}