export class Piece {
    nome: "PEAO" | "CAVALO" | "BISPO" | "TORRE" | "RAINHA" | "REI" | "";
    cor: "BRANCO" | "PRETO" | "";
    image: string = "";
    firstMove: boolean = true;

    constructor(nome: "PEAO" | "CAVALO" | "BISPO" | "TORRE" | "RAINHA" | "REI" | "", cor: "BRANCO" | "PRETO" | "", image: string, firstMove: boolean = true, isPossibleMove: boolean = false){
        this.nome = nome;
        this.cor = cor;
        this.image = image;
        this.firstMove = firstMove;
    }
}