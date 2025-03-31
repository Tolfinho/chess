import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place.model';
import { Piece } from './../models/piece.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  constructor(){}

  ngOnInit(){
    this.loadingBoard = true;

    // Inicializa o tabuleiro
    this.createBoard();
    this.loadingBoard = false;
  }

  // #region VARIABLES
  public tabuleiro: any = [];

  public turn: "BRANCO" | "PRETO" = "BRANCO";
  public loadingBoard: boolean = true;
  public currentPiece: Piece = new Piece("", "", "");
  public currentRowIndex: number = -1;
  public currentColIndex: number = -1;
  // #endregion VARIABLES

  // #region UTILITIES
  public createBoard() {

    var row = [];
    var piece: Piece;
    var place: Place;

    // Pretas
    piece = new Piece("TORRE", "PRETO", "/assets/rook-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("CAVALO", "PRETO", "/assets/knight-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("BISPO", "PRETO", "/assets/bishop-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("RAINHA", "PRETO", "/assets/queen-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("REI", "PRETO", "/assets/king-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("BISPO", "PRETO", "/assets/bishop-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("CAVALO", "PRETO", "/assets/knight-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("TORRE", "PRETO", "/assets/rook-b.svg");
    place = new Place(piece);
    row.push(place);

    this.tabuleiro.push(row);
    row = [];
    
    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "PRETO", "/assets/pawn-b.svg");
    place = new Place(piece);
    row.push(place);

    this.tabuleiro.push(row);
    row = [];

    this.tabuleiro.push([new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null)]);
    this.tabuleiro.push([new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null)]);
    this.tabuleiro.push([new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null)]);
    this.tabuleiro.push([new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null), new Place(null)]);

    // Brancas
    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("PEAO", "BRANCO", "/assets/pawn-w.svg");
    place = new Place(piece);
    row.push(place);

    this.tabuleiro.push(row);
    row = [];

    piece = new Piece("TORRE", "BRANCO", "/assets/rook-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("CAVALO", "BRANCO", "/assets/knight-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("BISPO", "BRANCO", "/assets/bishop-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("RAINHA", "BRANCO", "/assets/queen-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("REI", "BRANCO", "/assets/king-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("BISPO", "BRANCO", "/assets/bishop-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("CAVALO", "BRANCO", "/assets/knight-w.svg");
    place = new Place(piece);
    row.push(place);

    piece = new Piece("TORRE", "BRANCO", "/assets/rook-w.svg");
    place = new Place(piece);
    row.push(place);

    this.tabuleiro.push(row);
    row = [];

  }

  public getPossibleMoves(selectedPlace: Place, rowIndex: number, colIndex: number){

    this.clearPossibleMoves();
    
    // Caso não tenha clicado em uma peça
    if(selectedPlace.innerPiece === null) return;
    
    const piece = selectedPlace.innerPiece;

    // Caso não seja a vez da peça selecionada
    if(piece.cor !== this.turn) return;

    this.currentPiece = piece;
    this.currentRowIndex = rowIndex;
    this.currentColIndex = colIndex;

    switch(piece.nome){
      case "PEAO":
        if(piece.cor === "BRANCO"){
          if(piece.firstMove){
            this.tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;
            this.tabuleiro[rowIndex - 2][colIndex].isPossibleMove = true;
          } else {
            this.tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;
          }

          if(colIndex - 1 >= 0 && this.tabuleiro[rowIndex - 1][colIndex - 1].innerPiece !== null
              && this.tabuleiro[rowIndex - 1][colIndex - 1].innerPiece.cor === "PRETO"){
            this.tabuleiro[rowIndex - 1][colIndex - 1].isPossibleMove = true;
          }

          if(colIndex + 1 <= 7 && this.tabuleiro[rowIndex - 1][colIndex + 1].innerPiece !== null
            && this.tabuleiro[rowIndex - 1][colIndex + 1].innerPiece.cor === "PRETO"){
            this.tabuleiro[rowIndex - 1][colIndex + 1].isPossibleMove = true;
          }
        } else if(piece.cor === "PRETO"){
          if(piece.firstMove){
            this.tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;
            this.tabuleiro[rowIndex + 2][colIndex].isPossibleMove = true;
          } else {
            this.tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;
          }

          if(colIndex - 1 >= 0 && this.tabuleiro[rowIndex + 1][colIndex - 1].innerPiece !== null
              && this.tabuleiro[rowIndex + 1][colIndex - 1].innerPiece.cor === "BRANCO"){
            this.tabuleiro[rowIndex + 1][colIndex - 1].isPossibleMove = true;
          }

          if(colIndex + 1 <= 7 && this.tabuleiro[rowIndex + 1][colIndex + 1].innerPiece !== null
            && this.tabuleiro[rowIndex + 1][colIndex + 1].innerPiece.cor === "BRANCO"){
            this.tabuleiro[rowIndex + 1][colIndex + 1].isPossibleMove = true;
          }
        }
        break;
    }

  }

  // provisória para ajudar nos testes
  public movePiece(moveRowIndex: number, moveColIndex: number){
    this.tabuleiro[this.currentRowIndex][this.currentColIndex].innerPiece = null;
    this.currentPiece.firstMove = false;
    this.tabuleiro[moveRowIndex][moveColIndex].innerPiece = this.currentPiece;

    this.currentRowIndex = -1;
    this.currentColIndex = -1;
    this.currentPiece = new Piece("", "", "");
    this.clearPossibleMoves();

    this.nextTurn();
  }

  public clearPossibleMoves(){
    this.tabuleiro.forEach((row: any) => {
      row.forEach((col: any) => {
        col.isPossibleMove = false;
      });
    });
  }

  public nextTurn(){
    this.turn = this.turn === "BRANCO" ? "PRETO" : "BRANCO";
  }
  // #region UTILITIES

  teste(){
    console.log(this.tabuleiro)
  }

}
