export interface Position {
  x: number;
  y: number;
}

export interface PayloadTemplate<D> {
  id: string;
  data: D;
}
