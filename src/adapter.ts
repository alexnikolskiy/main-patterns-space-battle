import * as fs from 'fs'
import * as path from 'path'
import "reflect-metadata"
import { reflect } from 'typescript-rtti'
import { IoC, Resolver, InitScopeCommand } from './ioc'
import { Movable, MoveCommand } from './commands/move'
import Vector from './types/vector'
// import { RegisterMovableDepsCommand } from './movable.operations'

function init() {
  new InitScopeCommand().execute()
  const adapters = new Map<string, { new(...args: object[]): object }>()

  // IoC.resolve<Command>("IoC.Register", "Object.getPosition", ((args) => {
  //   return (args[0] as UObject).get('position')
  // }) as Resolver).execute()
  //
  // IoC.resolve<Command>("IoC.Register", "Object.setPosition", ((args) => {
  //   return (args[0] as UObject).set('position', args[1])
  // }) as Resolver).execute()
  //
  // IoC.resolve<Command>("IoC.Register", "Object.getVelocity", ((args) => {
  //   return (args[0] as UObject).get('velocity')
  // }) as Resolver).execute()

  IoC.resolve<Command>("IoC.Register", "Adapter", ((args) => {
    const reflection = reflect(args[0])
    const type = reflection.class.name

    if (adapters.has(type)) {
      const Adapter = adapters.get(type)
      if (Adapter) {
        return new Adapter(args[1])
      }
    }

    const className = `${type}Adapter`
    let adapterClass = `class ${className} {
      constructor(obj) {
        this.obj = obj
      }
    `
    let file = `import { IoC, Resolver } from './ioc'
    
export class Register${type}DepsCommand implements Command {
  execute() {
    `
    const filename = path.resolve(__dirname, `${type.toLowerCase()}.operations.ts`)
    const isFileExists = fs.existsSync(filename)
    console.log('=====', isFileExists)

    if (!isFileExists) {
      fs.openSync(filename, 'w')
    }

    const methods = reflection.methods
    methods.forEach(method => {
      const parameters = method.parameterNames
      adapterClass += buildClassMethod(type, method.name, parameters)
      file += buildDependencyResolve(type, method.name)
    })

    adapterClass += '}'
    file += `
  }
}
`
    const adapterClassConstructor = new Function('IoC', `return ${adapterClass}`)
    const Adapter = adapterClassConstructor(IoC)
    adapters.set(type, Adapter)
    if (!isFileExists) {
      fs.appendFileSync(filename, file)
    }
    return new Adapter(args[1])
  }) as Resolver).execute()

  IoC.resolve<Command>("IoC.Register", "Commands.Movable", ((args) => {
    return new MoveCommand(IoC.resolve<Movable>("Adapter", Movable, args[0]))
  }) as Resolver).execute()

  // new RegisterMovableDepsCommand().execute()

  const obj: UObject = new Map([['position', new Vector(5, 8)], ['velocity', new Vector(-7, 3)]])

  IoC.resolve<Command>("Commands.Movable", obj).execute()
  console.log(obj)
}

function buildClassMethod(type: string, name: string, parameters: string[]): string {
  return `${name}(${parameters.join(', ')}) {
    return IoC.resolve("Object.${type}.${name}", this.obj${parameters.length ? ", " + parameters.join(', ') : ''})
  };`
}

function buildDependencyResolve(type: string, name: string) {
  return `
    IoC.resolve<Command>("IoC.Register", "Object.${type}.${name}", ((args) => {
      throw new Error('Not implemented')  
    }) as Resolver).execute()
  `
}

init()