export type NomePeca = "PEAO" | "CAVALO" | "BISPO" | "TORRE" | "RAINHA" | "REI" | "";
export type CorPeca = "BRANCO" | "PRETO" | "";

export interface IPiece {
  nome: NomePeca;
  cor: CorPeca;
  image: string;
  firstMove: boolean;
}