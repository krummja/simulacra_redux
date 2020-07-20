import 'reflect-metadata';
import { injectable } from 'inversify';
import { Map } from '../map';

@injectable()
export class MapService
{
  public maps: Map[] = [];
  public currentMapId: number = 1;

  public add(m: Map): void
  {
    this.maps.push(m);
  }

  public clear(): void
  {
    this.maps = [];
  }

  public getCurrent(): Map
  {
    return this.maps.find((m) => m.id === this.currentMapId);
  }
 
  public getCurrentId(): number
  {
    return this.currentMapId;
  }

  public getMaxId(): number
  {
    if (this.maps.length === 0) {
      return 0;
    }
    return Math.max(...this.maps.map((m) => m.id));
  }

  public setCurrent(id: number): void {
    if (id < 0 || !this.maps.some((m) => m.id === id)) {
      throw new Error("Map ID out of range!");
    } else {
      this.currentMapId = id;
    }
  }
}