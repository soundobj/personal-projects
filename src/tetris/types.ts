export interface Coordinate {
  x: number;
  y: number;
}

export enum Tetrominoe {
  I = "I",
  O = "O",
  T = "T",
  L = "L" ,
  S = "S" 
}

export interface Shape {
  coordinates: Coordinate[];
  color: string;
  kind: Tetrominoe;
}