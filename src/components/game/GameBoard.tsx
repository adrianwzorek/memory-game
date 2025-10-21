import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MemoryCard from '../ui/MemoryCard';
import { useMemoryGameContext } from '../../contexts/MemoryGameContext';

const GameContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[8],
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
    },
}));

const CardGrid = styled(Box)(({ theme }) => ({
    maxWidth: 'min(600px, 95vw)',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'clamp(8px, 2vw, 16px)',
    padding: 'clamp(8px, 2vw, 16px)',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        gap: 'clamp(6px, 1.5vw, 12px)',
        padding: 'clamp(6px, 1.5vw, 12px)',
    },
}));

const GameBoard: React.FC = () => {
    const { gameState, flipCard } = useMemoryGameContext();

    const handleCardClick = (cardId: number) => {
        if (gameState.flippedCards.length < 2 && !gameState.isGameComplete) {
            flipCard(cardId);
        }
    };

    return (
        <GameContainer elevation={3}>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                }}
            >
                Memory Game
            </Typography>

            <CardGrid>
                {gameState.cards.map((card) => (
                    <MemoryCard
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card.id)}
                        disabled={gameState.flippedCards.length >= 2 || card.isMatched}
                        isSelected={gameState.flippedCards.includes(card.id)}
                    />
                ))}
            </CardGrid>

            {gameState.cards.length === 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        color: 'text.secondary'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Welcome to Memory Game!
                    </Typography>
                    <Typography variant="body1">
                        Click "Start Game" to begin playing
                    </Typography>
                </Box>
            )}
        </GameContainer>
    );
};

export default GameBoard;
