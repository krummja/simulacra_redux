import { DataMenu } from './datamenu';
import { EntityMenu } from './entitymenu';
import { BasicMenu } from './basicmenu';

export declare type UIModule = DataMenu 
                             | EntityMenu 
                             | BasicMenu


export interface IModule {
  id: number;
  draw: (x: number, y: number, w: number, h: number, target?: any, focused?: boolean) => void;
}