import { Strategy } from './ioc'

export type Resolver = (args: object[]) => object

export interface IScope {
  resolve(key: string, args: object[]): object
}

export class LeafScope implements IScope {
  constructor(private readonly strategy: Strategy) {}

  resolve(key: string, args: object[]): object {
    return this.strategy(key, args)
  }
}

export class Scope implements Scope {
  constructor(private dependencies: Map<string, Resolver>, private parent: Scope) {}

  resolve(key: string, args: object[]): object {
    if (this.dependencies.has(key)) {
      return (this.dependencies.get(key) as Resolver)(args)
    } else {
      return this.parent.resolve(key, args)
    }
  }
}

