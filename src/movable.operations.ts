import { IoC, Resolver } from './ioc'
    
export class RegisterMovableDepsCommand implements Command {
  execute() {
    
    IoC.resolve<Command>("IoC.Register", "Object.Movable.getPosition", ((args) => {
      throw new Error('Not implemented')  
    }) as Resolver).execute()
  
    IoC.resolve<Command>("IoC.Register", "Object.Movable.setPosition", ((args) => {
      throw new Error('Not implemented')  
    }) as Resolver).execute()
  
    IoC.resolve<Command>("IoC.Register", "Object.Movable.getVelocity", ((args) => {
      throw new Error('Not implemented')  
    }) as Resolver).execute()
  
  }
}
