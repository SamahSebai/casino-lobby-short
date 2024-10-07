export interface Studio {
  id: number;
  name: string;
  blockedCurrencies: string[];
}

export interface Game {
  id: number;
  name: string;
  studioId: number;
  gameTags: number[];
  imageUrl: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface LobbyData {
  games: Game[];
  studios: Studio[];
  tags: Tag[];
}
