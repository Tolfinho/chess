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
          // Antes de testar movimentos para frente, testa se a posição à frente está livre
          if(this.isPlaceFree(rowIndex - 1, colIndex)){
            if(piece.firstMove){
              this.tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;

              // No primeiro movimento do peão pode andar duas casas
              // Mas antes deve verificar se essa casa está livre
              if(this.isPlaceFree(rowIndex - 2, colIndex))
                this.tabuleiro[rowIndex - 2][colIndex].isPossibleMove = true;

            } else {
              this.tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;
            }
          }

          if(this.isPlaceValid(rowIndex, colIndex - 1) && !this.isPlaceFree(rowIndex - 1, colIndex - 1)
              && this.tabuleiro[rowIndex - 1][colIndex - 1].innerPiece.cor === "PRETO"){
            this.tabuleiro[rowIndex - 1][colIndex - 1].isPossibleMove = true;
          }

          if(this.isPlaceValid(rowIndex, colIndex + 1) && !this.isPlaceFree(rowIndex - 1, colIndex + 1)
            && this.tabuleiro[rowIndex - 1][colIndex + 1].innerPiece.cor === "PRETO"){
            this.tabuleiro[rowIndex - 1][colIndex + 1].isPossibleMove = true;
          }
        } else if(piece.cor === "PRETO"){
          // Antes de testar movimentos para frente, testa se a posição à frente está livre
          if(this.isPlaceFree(rowIndex + 1, colIndex)){
            if(piece.firstMove){
              this.tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;

              // No primeiro movimento do peão pode andar duas casas
              // Mas antes deve verificar se essa casa está livre
              if(this.isPlaceFree(rowIndex + 2, colIndex))
                this.tabuleiro[rowIndex + 2][colIndex].isPossibleMove = true;
            } else {
              this.tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;
            }
          }

          if(this.isPlaceValid(rowIndex, colIndex - 1) && !this.isPlaceFree(rowIndex + 1, colIndex - 1)
              && this.tabuleiro[rowIndex + 1][colIndex - 1].innerPiece.cor === "BRANCO"){
            this.tabuleiro[rowIndex + 1][colIndex - 1].isPossibleMove = true;
          }

          if(this.isPlaceValid(rowIndex, colIndex + 1) && !this.isPlaceFree(rowIndex + 1, colIndex + 1)
            && this.tabuleiro[rowIndex + 1][colIndex + 1].innerPiece.cor === "BRANCO"){
            this.tabuleiro[rowIndex + 1][colIndex + 1].isPossibleMove = true;
          }
        }
        break;
    
      case "CAVALO":
        // Top
        if(this.isPlaceValid(rowIndex - 2, colIndex - 1)){
          if(this.isPlaceFree(rowIndex - 2, colIndex - 1)){
            this.tabuleiro[rowIndex - 2][colIndex - 1].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex - 2][colIndex - 1].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex - 2][colIndex - 1].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(rowIndex - 2, colIndex + 1)){
          if(this.isPlaceFree(rowIndex - 2, colIndex + 1)){
            this.tabuleiro[rowIndex - 2][colIndex + 1].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex - 2][colIndex + 1].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex - 2][colIndex + 1].isPossibleMove = true;
          }
        }

        // Bottom
        if(this.isPlaceValid(rowIndex + 2, colIndex - 1)){
          if(this.isPlaceFree(rowIndex + 2, colIndex - 1)){
            this.tabuleiro[rowIndex + 2][colIndex - 1].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex + 2][colIndex - 1].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex + 2][colIndex - 1].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(rowIndex + 2, colIndex + 1)){
          if(this.isPlaceFree(rowIndex + 2, colIndex + 1)){
            this.tabuleiro[rowIndex + 2][colIndex + 1].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex + 2][colIndex + 1].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex + 2][colIndex + 1].isPossibleMove = true;
          }
        }
        
        // Left
        if(this.isPlaceValid(rowIndex - 1, colIndex - 2)){
          if(this.isPlaceFree(rowIndex - 1, colIndex - 2)){
            this.tabuleiro[rowIndex - 1][colIndex - 2].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex - 1][colIndex - 2].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex - 1][colIndex - 2].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(rowIndex + 1, colIndex - 2)){
          if(this.isPlaceFree(rowIndex + 1, colIndex - 2)){
            this.tabuleiro[rowIndex + 1][colIndex - 2].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex + 1][colIndex - 2].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex + 1][colIndex - 2].isPossibleMove = true;
          }
        }

        // Right
        if(this.isPlaceValid(rowIndex - 1, colIndex + 2)){
          if(this.isPlaceFree(rowIndex - 1, colIndex + 2)){
            this.tabuleiro[rowIndex - 1][colIndex + 2].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex - 1][colIndex + 2].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex - 1][colIndex + 2].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(rowIndex + 1, colIndex + 2)){
          if(this.isPlaceFree(rowIndex + 1, colIndex + 2)){
            this.tabuleiro[rowIndex + 1][colIndex + 2].isPossibleMove = true;
          } else if(this.tabuleiro[rowIndex + 1][colIndex + 2].innerPiece.cor !== piece.cor){
            this.tabuleiro[rowIndex + 1][colIndex + 2].isPossibleMove = true;
          }
        }

        break;
    
      case "BISPO":
        var nextPositionRow;
        var nextPositionCol;
        var cont = 0;
        var blockTopRight = false;
        var blockTopLeft = false;
        var blockBottomRight = false;
        var blockBottomLeft = false;

        do {
          cont += 1;

          if(!blockTopRight){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTopRight = true;
              } else {
                blockTopRight = true;
              }
            } else {
              blockTopRight = true;
            }
          }

          if(!blockTopLeft){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTopLeft = true;
              } else {
                blockTopLeft = true;
              }
            } else {
              blockTopLeft = true;
            }
          }

          if(!blockBottomRight){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottomRight = true;
              } else {
                blockBottomRight = true;
              }
            } else {
              blockBottomRight = true;
            }
          }

          if(!blockBottomLeft){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottomLeft = true;
              } else {
                blockBottomLeft = true;
              }
            } else {
              blockBottomLeft = true;
            }
          }
        } while(!blockTopRight || !blockTopLeft || !blockBottomRight || !blockBottomLeft);

        break;

      case "TORRE":
        var nextPositionRow;
        var nextPositionCol;
        var cont = 0;
        var blockTop = false;
        var blockBottom = false;
        var blockLeft = false;
        var blockRight = false;

        do {
          cont += 1;

          if(!blockTop){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTop = true;
              } else {
                blockTop = true;
              }
            } else {
              blockTop = true;
            }
          }

          if(!blockBottom){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottom = true;
              } else {
                blockBottom = true;
              }
            } else {
              blockBottom = true;
            }
          }

          if(!blockLeft){
            nextPositionRow = rowIndex;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockLeft = true;
              } else {
                blockLeft = true;
              }
            } else {
              blockLeft = true;
            }
          }

          if(!blockRight){
            nextPositionRow = rowIndex;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockRight = true;
              } else {
                blockRight = true;
              }
            } else {
              blockRight = true;
            }
          }
        } while(!blockTop || !blockBottom || !blockLeft || !blockRight);

        break;

      case "RAINHA":
        var nextPositionRow;
        var nextPositionCol;
        var cont = 0;
        var blockTopRight = false;
        var blockTopLeft = false;
        var blockBottomRight = false;
        var blockBottomLeft = false;
        var blockTop = false;
        var blockBottom = false;
        var blockLeft = false;
        var blockRight = false;

        do {
          cont += 1;

          if(!blockTopRight){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTopRight = true;
              } else {
                blockTopRight = true;
              }
            } else {
              blockTopRight = true;
            }
          }

          if(!blockTopLeft){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTopLeft = true;
              } else {
                blockTopLeft = true;
              }
            } else {
              blockTopLeft = true;
            }
          }

          if(!blockBottomRight){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottomRight = true;
              } else {
                blockBottomRight = true;
              }
            } else {
              blockBottomRight = true;
            }
          }

          if(!blockBottomLeft){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottomLeft = true;
              } else {
                blockBottomLeft = true;
              }
            } else {
              blockBottomLeft = true;
            }
          }

          if(!blockTop){
            nextPositionRow = rowIndex - cont;
            nextPositionCol = colIndex;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockTop = true;
              } else {
                blockTop = true;
              }
            } else {
              blockTop = true;
            }
          }

          if(!blockBottom){
            nextPositionRow = rowIndex + cont;
            nextPositionCol = colIndex;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockBottom = true;
              } else {
                blockBottom = true;
              }
            } else {
              blockBottom = true;
            }
          }

          if(!blockLeft){
            nextPositionRow = rowIndex;
            nextPositionCol = colIndex - cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockLeft = true;
              } else {
                blockLeft = true;
              }
            } else {
              blockLeft = true;
            }
          }

          if(!blockRight){
            nextPositionRow = rowIndex;
            nextPositionCol = colIndex + cont;
  
            if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
                this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
                blockRight = true;
              } else {
                blockRight = true;
              }
            } else {
              blockRight = true;
            }
          }

        } while(!blockTopRight || !blockTopLeft || !blockBottomRight || !blockBottomLeft
                || !blockTop || !blockBottom || !blockLeft || !blockRight);

        break;

      case "REI":
        var nextPositionRow;
        var nextPositionCol;

        // Top
        nextPositionRow = rowIndex - 1;
        nextPositionCol = colIndex;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Top-Right
        nextPositionRow = rowIndex - 1;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Right
        nextPositionRow = rowIndex;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom-Right
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom-Left
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Left
        nextPositionRow = rowIndex;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Top-Left
        nextPositionRow = rowIndex - 1;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(nextPositionRow, nextPositionCol)){
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(this.tabuleiro[nextPositionRow][nextPositionCol].innerPiece.cor !== this.turn) {
            this.tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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

  public isPlaceFree(rowIndex: number, colIndex: number) : boolean {

    // Validações para fins de debug
    // Retirar depois de finalizado o jogo
    if(rowIndex < 0 || rowIndex > 7){
      window.alert("Index da linha inválido...");
      return false;
    }

    if(colIndex < 0 || colIndex > 7){
      window.alert("Index da coluna inválido...");
      return false;
    }

    return this.tabuleiro[rowIndex][colIndex].innerPiece === null;
  }

  public isPlaceValid(rowIndex: number, colIndex: number) : boolean{
    // Verifica se posição está dentro do tabuleiro
    return (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 0 && colIndex <= 7);
  }
  // #region UTILITIES

  teste(){
    console.log(this.tabuleiro)
  }

}
