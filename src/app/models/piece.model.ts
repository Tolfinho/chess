export class Piece {
    nome: string = "";
    cor: string = "";
    image: string = "";
    firstMove: boolean = true;

    constructor(nome: string, cor: string, image: string, firstMove: boolean = true, isPossibleMove: boolean = false){
        this.nome = nome;
        this.cor = cor;
        this.image = image;
        this.firstMove = firstMove;
    }
}