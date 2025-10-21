import { useState, useCallback, useEffect } from 'react';
import type { GameState, Card } from '../types/game';

const CARD_VALUES = [
    'SportsEsports', 'SportsTennis', 'Casino', 'TheaterComedy',
    'Palette', 'MusicNote', 'Piano', 'Mic', 'Headphones',
    'DrumSet', 'Guitar', 'Radio'
];

const createShuffledCards = (): Card[] => {
    const pairs = CARD_VALUES.slice(0, 8); // Use 8 pairs for a 4x4 grid
    const cards = [...pairs, ...pairs].map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));

    // Shuffle the cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
};

const initialState: GameState = {
    cards: [],
    flippedCards: [],
    moves: 0,
    score: 0,
    isGameComplete: false,
    isGameStarted: false,
};

export const useMemoryGame = () => {
    const [gameState, setGameState] = useState<GameState>(initialState);

    const startGame = useCallback(() => {
        const shuffledCards = createShuffledCards();
        setGameState({
            ...initialState,
            cards: shuffledCards,
            isGameStarted: true,
        });
    }, []);

    const resetGame = useCallback(() => {
        setGameState(initialState);
    }, []);

    const flipCard = useCallback((cardId: number) => {
        setGameState(prevState => {
            if (prevState.flippedCards.length >= 2) return prevState;

            const card = prevState.cards.find(c => c.id === cardId);
            if (!card || card.isFlipped || card.isMatched) return prevState;

            const updatedCards = prevState.cards.map(c =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            );

            const newFlippedCards = [...prevState.flippedCards, cardId];

            return {
                ...prevState,
                cards: updatedCards,
                flippedCards: newFlippedCards,
            };
        });
    }, []);

    const checkMatch = useCallback(() => {
        setGameState(prevState => {
            if (prevState.flippedCards.length !== 2) return prevState;

            const [firstId, secondId] = prevState.flippedCards;
            const firstCard = prevState.cards.find(c => c.id === firstId);
            const secondCard = prevState.cards.find(c => c.id === secondId);

            if (!firstCard || !secondCard) return prevState;

            const isMatch = firstCard.value === secondCard.value;
            const newMoves = prevState.moves + 1;
            const newScore = isMatch ? prevState.score + 10 : prevState.score;

            let updatedCards = prevState.cards.map(card => {
                if (card.id === firstId || card.id === secondId) {
                    return { ...card, isMatched: isMatch, isFlipped: isMatch };
                }
                return card;
            });

            // If no match, flip cards back after a delay
            if (!isMatch) {
                setTimeout(() => {
                    setGameState(currentState => ({
                        ...currentState,
                        cards: currentState.cards.map(card => {
                            if (card.id === firstId || card.id === secondId) {
                                return { ...card, isFlipped: false };
                            }
                            return card;
                        }),
                        flippedCards: [],
                    }));
                }, 1000);
            }

            const isGameComplete = updatedCards.every(card => card.isMatched);

            return {
                ...prevState,
                cards: updatedCards,
                flippedCards: isMatch ? [] : prevState.flippedCards,
                moves: newMoves,
                score: newScore,
                isGameComplete,
            };
        });
    }, []);

    // Auto-check for matches when 2 cards are flipped
    useEffect(() => {
        if (gameState.flippedCards.length === 2) {
            const timer = setTimeout(() => {
                checkMatch();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [gameState.flippedCards, checkMatch]);

    return {
        gameState,
        startGame,
        resetGame,
        flipCard,
    };
};
