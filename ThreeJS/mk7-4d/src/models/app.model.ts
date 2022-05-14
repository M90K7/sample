import { Scene3D } from "./three";

export const Type = Function;

export interface Type<T> extends Function {
  new(...args: any[]): T;
}

export interface SceneModel {
  name: string;
  type: Type<Scene3D>;
  active?: boolean;
}