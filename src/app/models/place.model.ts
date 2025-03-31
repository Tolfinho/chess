import { Piece } from "./piece.model";

export class Place {
    innerPiece: Piece | null = null;
    isPossibleMove: boolean = false;

    constructor(piece: Piece | null){
        this.innerPiece = piece;
    }
}