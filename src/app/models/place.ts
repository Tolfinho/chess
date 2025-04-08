import { IPiece } from "./piece";

export interface IPlace {
    innerPiece: IPiece | null;
    isPossibleMove: boolean;
  }