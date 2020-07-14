import { Entity } from '../entity';


export class EntityService {
  public entities: Entity[] = [];

  public addEntity(e: Entity): void
  {
    if (this.entities.some((eo) => eo.id === e.id)) {
      throw new Error(`An entity with ID ${e.id} already exists!`);
    }
    this.entities.push(e);
  }

  public clearEntities(): void
  {
    this.entities = [];
  }

  public deleteEntityById(id: number): void
  {
    this.entities = this.entities.filter((e) => e.id !== id);
  }

  public getEntityById(id: number): Entity | undefined
  {
    return this.entities.find((e) => e.id === id);
  }

  public getEntityAtPosition(x: number, y: number): Entity[] | null
  {
    return this.entities.filter((e) => e.x === x && e.y === y);
  }

  public getMaxId(): number
  {
    if (this.entities.length === 0) { 
      return 0; 
    }
    return Math.max(...this.entities.map((e) => e.id));
  }

  public newId(): number
  {
    let id = Math.floor(100000 + Math.random() * 900000)

    return id;
  }
}