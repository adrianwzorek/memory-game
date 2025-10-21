import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useMemoryGame } from '../hooks/useMemoryGame';
import type { GameState } from '../types/game';

interface MemoryGameContextType {
    gameState: GameState;
    startGame: () => void;
    resetGame: () => void;
    flipCard: (cardId: number) => void;
}

const MemoryGameContext = createContext<MemoryGameContextType | undefined>(undefined);

interface MemoryGameProviderProps {
    children: ReactNode;
}

export const MemoryGameProvider: React.FC<MemoryGameProviderProps> = ({ children }) => {
    const memoryGame = useMemoryGame();

    return (
        <MemoryGameContext.Provider value={memoryGame}>
            {children}
        </MemoryGameContext.Provider>
    );
};

export const useMemoryGameContext = (): MemoryGameContextType => {
    const context = useContext(MemoryGameContext);
    if (context === undefined) {
        throw new Error('useMemoryGameContext must be used within a MemoryGameProvider');
    }
    return context;
};
