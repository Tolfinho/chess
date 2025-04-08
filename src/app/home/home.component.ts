import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tabuleiro } from '../models/tabuleiro';
import { IPlace } from '../models/place';
import { CorPeca, IPiece, NomePeca } from '../models/piece';

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
    this.tabuleiro = this.criaTabuleiro();
    this.loadingBoard = false;
    
    this.nextTurn(true);
  }

  // #region VARIABLES
  public tabuleiro: Tabuleiro = this.novoTabuleiroVazio();

  public turn: "BRANCO" | "PRETO" = "BRANCO";
  public loadingBoard: boolean = true;
  public currentPiece: IPiece | null = this.novaPecaVazia();
  public currentRowIndex: number = -1;
  public currentColIndex: number = -1;
  public xeque: boolean = false;
  public xequeMate: boolean = false;
  public xequeCor: CorPeca = "";

  public interval: any;
  public timerPreto: number = 180;
  public timerBranco: number = 180;
  // #endregion VARIABLES

  // #region UTILITIES
  public handlePossibleMoves(tabuleiro: Tabuleiro, rowIndex: number, colIndex: number){

    this.currentPiece = tabuleiro[rowIndex][colIndex].innerPiece;
    this.currentRowIndex = rowIndex;
    this.currentColIndex = colIndex;

    tabuleiro = this.getPossibleMoves(tabuleiro, rowIndex, colIndex);
    var auxTabuleiro: Tabuleiro;
    var auxXeque: boolean = false;

    // Verifica se cada possível movimento não deixa o rei exposto
    for(var i=0; i<=7; i++){
      for(var j=0; j<=7; j++){

        if(tabuleiro[i][j].isPossibleMove){
          auxTabuleiro = this.copiaTabuleiro(tabuleiro);
          auxTabuleiro[i][j].innerPiece = this.currentPiece;
          auxTabuleiro[this.currentRowIndex][this.currentColIndex].innerPiece = null;
          //console.log(auxTabuleiro)
          auxXeque = this.isXeque(auxTabuleiro, this.turn);
          //console.log(auxXeque)
          // if(auxXeque) tabuleiro[i][j].isPossibleMove = false;
        }
        
      }
    }

    this.tabuleiro = tabuleiro;

  }

  public getPossibleMoves(tabuleiro: Tabuleiro, rowIndex: number, colIndex: number): Tabuleiro{

    tabuleiro = this.clearPossibleMoves(tabuleiro);

    const piece: IPiece | null = tabuleiro[rowIndex][colIndex].innerPiece;
    
    // Caso não tenha clicado em uma peça
    if(piece === null) return tabuleiro;

    // Caso não seja a vez da peça selecionada
    //if(piece.cor !== this.turn) return tabuleiro;

    switch(piece.nome){
      case "PEAO":
        if(piece.cor === "BRANCO"){
          // Antes de testar movimentos para frente, testa se a posição à frente está livre
          if(this.isPlaceFree(tabuleiro, rowIndex - 1, colIndex)){
            if(piece.firstMove){
              tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;

              // No primeiro movimento do peão pode andar duas casas
              // Mas antes deve verificar se essa casa está livre
              if(this.isPlaceFree(tabuleiro, rowIndex - 2, colIndex))
                tabuleiro[rowIndex - 2][colIndex].isPossibleMove = true;

            } else {
              tabuleiro[rowIndex - 1][colIndex].isPossibleMove = true;
            }
          }

          if(this.isPlaceValid(tabuleiro, rowIndex, colIndex - 1) && !this.isPlaceFree(tabuleiro, rowIndex - 1, colIndex - 1)
              && tabuleiro[rowIndex - 1][colIndex - 1].innerPiece!.cor === "PRETO"){
            tabuleiro[rowIndex - 1][colIndex - 1].isPossibleMove = true;
          }

          if(this.isPlaceValid(tabuleiro, rowIndex, colIndex + 1) && !this.isPlaceFree(tabuleiro, rowIndex - 1, colIndex + 1)
            && tabuleiro[rowIndex - 1][colIndex + 1].innerPiece!.cor === "PRETO"){
            tabuleiro[rowIndex - 1][colIndex + 1].isPossibleMove = true;
          }
        } else if(piece.cor === "PRETO"){
          // Antes de testar movimentos para frente, testa se a posição à frente está livre
          if(this.isPlaceFree(tabuleiro, rowIndex + 1, colIndex)){
            if(piece.firstMove){
              tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;

              // No primeiro movimento do peão pode andar duas casas
              // Mas antes deve verificar se essa casa está livre
              if(this.isPlaceFree(tabuleiro, rowIndex + 2, colIndex))
                tabuleiro[rowIndex + 2][colIndex].isPossibleMove = true;
            } else {
              tabuleiro[rowIndex + 1][colIndex].isPossibleMove = true;
            }
          }

          if(this.isPlaceValid(tabuleiro, rowIndex, colIndex - 1) && !this.isPlaceFree(tabuleiro, rowIndex + 1, colIndex - 1)
              && tabuleiro[rowIndex + 1][colIndex - 1].innerPiece!.cor === "BRANCO"){
            tabuleiro[rowIndex + 1][colIndex - 1].isPossibleMove = true;
          }

          if(this.isPlaceValid(tabuleiro, rowIndex, colIndex + 1) && !this.isPlaceFree(tabuleiro, rowIndex + 1, colIndex + 1)
            && tabuleiro[rowIndex + 1][colIndex + 1].innerPiece!.cor === "BRANCO"){
            tabuleiro[rowIndex + 1][colIndex + 1].isPossibleMove = true;
          }
        }
        break;
    
      case "CAVALO":
        // Top
        if(this.isPlaceValid(tabuleiro, rowIndex - 2, colIndex - 1)){
          if(this.isPlaceFree(tabuleiro, rowIndex - 2, colIndex - 1)){
            tabuleiro[rowIndex - 2][colIndex - 1].isPossibleMove = true;
          } else if(tabuleiro[rowIndex - 2][colIndex - 1].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex - 2][colIndex - 1].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(tabuleiro, rowIndex - 2, colIndex + 1)){
          if(this.isPlaceFree(tabuleiro, rowIndex - 2, colIndex + 1)){
            tabuleiro[rowIndex - 2][colIndex + 1].isPossibleMove = true;
          } else if(tabuleiro[rowIndex - 2][colIndex + 1].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex - 2][colIndex + 1].isPossibleMove = true;
          }
        }

        // Bottom
        if(this.isPlaceValid(tabuleiro, rowIndex + 2, colIndex - 1)){
          if(this.isPlaceFree(tabuleiro, rowIndex + 2, colIndex - 1)){
            tabuleiro[rowIndex + 2][colIndex - 1].isPossibleMove = true;
          } else if(tabuleiro[rowIndex + 2][colIndex - 1].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex + 2][colIndex - 1].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(tabuleiro, rowIndex + 2, colIndex + 1)){
          if(this.isPlaceFree(tabuleiro, rowIndex + 2, colIndex + 1)){
            tabuleiro[rowIndex + 2][colIndex + 1].isPossibleMove = true;
          } else if(tabuleiro[rowIndex + 2][colIndex + 1].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex + 2][colIndex + 1].isPossibleMove = true;
          }
        }
        
        // Left
        if(this.isPlaceValid(tabuleiro, rowIndex - 1, colIndex - 2)){
          if(this.isPlaceFree(tabuleiro, rowIndex - 1, colIndex - 2)){
            tabuleiro[rowIndex - 1][colIndex - 2].isPossibleMove = true;
          } else if(tabuleiro[rowIndex - 1][colIndex - 2].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex - 1][colIndex - 2].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(tabuleiro, rowIndex + 1, colIndex - 2)){
          if(this.isPlaceFree(tabuleiro, rowIndex + 1, colIndex - 2)){
            tabuleiro[rowIndex + 1][colIndex - 2].isPossibleMove = true;
          } else if(tabuleiro[rowIndex + 1][colIndex - 2].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex + 1][colIndex - 2].isPossibleMove = true;
          }
        }

        // Right
        if(this.isPlaceValid(tabuleiro, rowIndex - 1, colIndex + 2)){
          if(this.isPlaceFree(tabuleiro, rowIndex - 1, colIndex + 2)){
            tabuleiro[rowIndex - 1][colIndex + 2].isPossibleMove = true;
          } else if(tabuleiro[rowIndex - 1][colIndex + 2].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex - 1][colIndex + 2].isPossibleMove = true;
          }
        }
        
        if(this.isPlaceValid(tabuleiro, rowIndex + 1, colIndex + 2)){
          if(this.isPlaceFree(tabuleiro, rowIndex + 1, colIndex + 2)){
            tabuleiro[rowIndex + 1][colIndex + 2].isPossibleMove = true;
          } else if(tabuleiro[rowIndex + 1][colIndex + 2].innerPiece!.cor !== piece.cor){
            tabuleiro[rowIndex + 1][colIndex + 2].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
  
            if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
              if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
              } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
                tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
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
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Top-Right
        nextPositionRow = rowIndex - 1;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Right
        nextPositionRow = rowIndex;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom-Right
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex + 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Bottom-Left
        nextPositionRow = rowIndex + 1;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Left
        nextPositionRow = rowIndex;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        // Top-Left
        nextPositionRow = rowIndex - 1;
        nextPositionCol = colIndex - 1;
        if(this.isPlaceValid(tabuleiro, nextPositionRow, nextPositionCol)){
          if(this.isPlaceFree(tabuleiro, nextPositionRow, nextPositionCol)){
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          } else if(tabuleiro[nextPositionRow][nextPositionCol].innerPiece!.cor !== this.turn) {
            tabuleiro[nextPositionRow][nextPositionCol].isPossibleMove = true;
          }
        }

        break;
    }

    return tabuleiro;
  }

  // provisória para ajudar nos testes
  public movePiece(tabuleiro: Tabuleiro, moveRowIndex: number, moveColIndex: number): Tabuleiro {
    tabuleiro[this.currentRowIndex][this.currentColIndex].innerPiece = null;
    this.currentPiece!.firstMove = false;
    tabuleiro[moveRowIndex][moveColIndex].innerPiece = this.currentPiece;
    this.xeque = this.isXeque(this.tabuleiro, this.currentPiece!.cor === "PRETO" ? "BRANCO" : "PRETO");
    this.xequeCor = this.xeque ? (this.currentPiece!.cor === "PRETO" ? "BRANCO" : "PRETO") : "";

    this.currentRowIndex = -1;
    this.currentColIndex = -1;
    this.currentPiece = this.novaPecaVazia();
    tabuleiro = this.clearPossibleMoves(tabuleiro);
    this.nextTurn();

    return tabuleiro;
  }

  public isXeque(tabuleiro: Tabuleiro, cor: CorPeca){
    // Passa por todos os possíveis movimentos das peças
    // Caso o rei seja um possivel movimento, é xeque

    var xeque: boolean = false;
    var reiRow: number = -1;
    var reiCol: number = -1;
    var auxTabuleiro = this.copiaTabuleiro(tabuleiro);

    // Acha o rei
    for(var i=0; i<=7; i++){
      for(var j=0; j<=7; j++){

        if(!this.isPlaceFree(auxTabuleiro, i, j) && auxTabuleiro[i][j].innerPiece!.nome === "REI" && auxTabuleiro[i][j].innerPiece!.cor === cor){
          reiRow = i;
          reiCol = j;
        }

      } 
    }

    for(var i=0; i<=7; i++){
      for(var j=0; j<=7; j++){
        
        if(!this.isPlaceFree(auxTabuleiro, i, j) && auxTabuleiro[i][j].innerPiece!.cor !== cor){
          auxTabuleiro = this.getPossibleMoves(auxTabuleiro, i, j)
          console.log(auxTabuleiro)

          if(auxTabuleiro[reiRow][reiCol].isPossibleMove){
            xeque = true;
            break;
          }

          //tabuleiro = this.clearPossibleMoves(tabuleiro);
        }
      } 
    }

    return xeque;
  }

  public isXequeMate(){
    
  }

  public clearPossibleMoves(tabuleiro: Tabuleiro): Tabuleiro{
    for(var i=0; i <= 7; i++){
      for(var j=0; j <= 7; j++){
        tabuleiro[i][j].isPossibleMove = false;
      }
    }

    return tabuleiro;
  }

  public nextTurn(firstTurn: boolean = false){
    if(firstTurn) this.turn = "BRANCO";
    else this.turn = this.turn === "BRANCO" ? "PRETO" : "BRANCO";

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if(this.turn === "BRANCO")
        this.timerBranco--;
      else
        this.timerPreto--;

      if(this.timerBranco <= 0)
        this.endGame("PRETO")
      if(this.timerPreto <= 0)
        this.endGame("BRANCO")
    }, 1000)
  }

  public endGame(winner: CorPeca){
    alert("As peças " + (winner === "BRANCO" ? "Brancas" : "Pretas") + " venceram!!!");

    clearInterval(this.interval);

    this.criaTabuleiro();
    this.timerPreto = 180;
    this.timerBranco = 180;
  }

  public isPlaceFree(tabuleiro: Tabuleiro, rowIndex: number, colIndex: number) : boolean {

    // Validações para fins de debug
    // Retirar depois de finalizado o jogo
    if(rowIndex < 0 || rowIndex > tabuleiro.length - 1){
      window.alert("Index da linha inválido...");
      return false;
    }

    if(colIndex < 0 || colIndex > tabuleiro[0].length - 1){
      window.alert("Index da coluna inválido...");
      return false;
    }

    return tabuleiro[rowIndex][colIndex].innerPiece === null;
  }

  public isPlaceValid(tabuleiro: Tabuleiro, rowIndex: number, colIndex: number) : boolean{
    // Verifica se posição está dentro do tabuleiro
    return (rowIndex >= 0 && rowIndex <= tabuleiro.length - 1 && colIndex >= 0 && colIndex <= tabuleiro[0].length - 1);
  }

  public copiaTabuleiro(tabuleiro: Tabuleiro): Tabuleiro {
    
    const tabuleiroCopiado = this.novoTabuleiroVazio();

    for(var i=0; i <= 7; i++){
      for(var j=0; j <= 7; j++){
        tabuleiroCopiado[i][j].innerPiece = tabuleiro[i][j].innerPiece;
        tabuleiroCopiado[i][j].isPossibleMove = tabuleiro[i][j].isPossibleMove;
      }
    }

    return tabuleiroCopiado;
  }

  private novaPecaVazia(): IPiece {
    return { nome: "", cor: "", image: "", firstMove: true }
  }

  private novoLugarVazio(): IPlace {
    return {
      innerPiece: null,
      isPossibleMove: false,
    };
  }

  private novoTabuleiroVazio(): Tabuleiro {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => this.novoLugarVazio())
    );
  }

  private criaTabuleiro(): Tabuleiro {

    // var row = [];
    // var piece: Piece;
    // var place: Place;
    var newTabuleiro: Tabuleiro = this.novoTabuleiroVazio();

    // Pretas
    newTabuleiro[0][0].innerPiece = { nome: "TORRE", cor: "PRETO", image: "/assets/rook-b.svg", firstMove: true }
    newTabuleiro[0][1].innerPiece = { nome: "CAVALO", cor: "PRETO", image: "/assets/knight-b.svg", firstMove: true }
    newTabuleiro[0][2].innerPiece = { nome: "BISPO", cor: "PRETO", image: "/assets/bishop-b.svg", firstMove: true }
    newTabuleiro[0][3].innerPiece = { nome: "RAINHA", cor: "PRETO", image: "/assets/queen-b.svg", firstMove: true }
    newTabuleiro[0][4].innerPiece = { nome: "REI", cor: "PRETO", image: "/assets/king-b.svg", firstMove: true }
    newTabuleiro[0][5].innerPiece = { nome: "BISPO", cor: "PRETO", image: "/assets/bishop-b.svg", firstMove: true }
    newTabuleiro[0][6].innerPiece = { nome: "CAVALO", cor: "PRETO", image: "/assets/knight-b.svg", firstMove: true }
    newTabuleiro[0][7].innerPiece = { nome: "TORRE", cor: "PRETO", image: "/assets/rook-b.svg", firstMove: true }
    
    newTabuleiro[1][0].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][1].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][2].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][3].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][4].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][5].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][6].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }
    newTabuleiro[1][7].innerPiece = { nome: "PEAO", cor: "PRETO", image: "/assets/pawn-b.svg", firstMove: true }

    // Brancas
    newTabuleiro[6][0].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][1].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][2].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][3].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][4].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][5].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][6].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }
    newTabuleiro[6][7].innerPiece = { nome: "PEAO", cor: "BRANCO", image: "/assets/pawn-w.svg", firstMove: true }

    newTabuleiro[7][0].innerPiece = { nome: "TORRE", cor: "BRANCO", image: "/assets/rook-w.svg", firstMove: true }
    newTabuleiro[7][1].innerPiece = { nome: "CAVALO", cor: "BRANCO", image: "/assets/knight-w.svg", firstMove: true }
    newTabuleiro[7][2].innerPiece = { nome: "BISPO", cor: "BRANCO", image: "/assets/bishop-w.svg", firstMove: true }
    newTabuleiro[7][3].innerPiece = { nome: "RAINHA", cor: "BRANCO", image: "/assets/queen-w.svg", firstMove: true }
    newTabuleiro[7][4].innerPiece = { nome: "REI", cor: "BRANCO", image: "/assets/king-w.svg", firstMove: true }
    newTabuleiro[7][5].innerPiece = { nome: "BISPO", cor: "BRANCO", image: "/assets/bishop-w.svg", firstMove: true }
    newTabuleiro[7][6].innerPiece = { nome: "CAVALO", cor: "BRANCO", image: "/assets/knight-w.svg", firstMove: true }
    newTabuleiro[7][7].innerPiece = { nome: "TORRE", cor: "BRANCO", image: "/assets/rook-w.svg", firstMove: true }

    return newTabuleiro;
  }

  public formatTimer(seconds: number): string {
    var formattedTimer: string = "";
    var min: string = Math.floor(seconds/60).toString();
    var sec: string = (seconds%60).toString();
    formattedTimer += (min.length > 1 ? min : "0"+min)+":"+(sec.length > 1 ? sec : "0"+sec);

    return formattedTimer;
  }
  // #region UTILITIES

  teste(){
    console.log(this.tabuleiro)
  }

}
