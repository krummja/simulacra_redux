import { Vec } from '../../stage/array2d';
import { Actor } from '../actor';


export class ActorService {
  public actors: Actor[] = [];

  public addActor(a: Actor): void
  {
    if (this.actors.some((ao) => ao.id === a.id)) {
      throw new Error(`An Actor with ID ${a.id} already exists!`);
    }
    this.actors.push(a);
  }

  public clearactors(): void
  {
    this.actors = [];
  }

  public deleteActorById(id: number): void
  {
    this.actors = this.actors.filter((e) => e.id !== id);
  }

  public getActorById(id: number): Actor | undefined
  {
    return this.actors.find((a) => a.id === id);
  }

  public getActorAtPosition(pos: Vec): Actor[] | null
  {
    return this.actors.filter((a) => a.pos.x === pos.x && a.pos.y === pos.y);
  }

  public getMaxId(): number
  {
    if (this.actors.length === 0) { 
      return 0; 
    }
    return Math.max(...this.actors.map((e) => e.id));
  }

  public newId(): number
  {
    let id = Math.floor(100000 + Math.random() * 900000)

    return id;
  }
}