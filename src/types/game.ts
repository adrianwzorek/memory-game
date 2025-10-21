export interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface GameState {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    score: number;
    isGameComplete: boolean;
    isGameStarted: boolean;
}

export type GameAction =
    | { type: 'FLIP_CARD'; payload: number }
    | { type: 'CHECK_MATCH' }
    | { type: 'RESET_GAME' }
    | { type: 'START_GAME' }
    | { type: 'SHUFFLE_CARDS' };
