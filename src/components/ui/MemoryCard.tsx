import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Icons from '@mui/icons-material';
import type { Card as GameCard } from '../../types/game';

interface MemoryCardProps {
    card: GameCard;
    onClick: () => void;
    disabled?: boolean;
    isSelected?: boolean;
}

const StyledCard = styled(Card)<{ isFlipped: boolean; isMatched: boolean; isSelected: boolean }>(({ theme, isFlipped, isMatched, isSelected }) => ({
    width: 'clamp(60px, 15vw, 120px)',
    height: 'clamp(60px, 15vw, 120px)',
    minWidth: 60,
    minHeight: 60,
    cursor: 'pointer',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
    perspective: '1000px',
    opacity: isMatched ? 0.7 : 1,
    boxShadow: isSelected ? '0 0 25px rgba(255, 193, 7, 1), 0 0 50px rgba(255, 193, 7, 0.5)' : undefined,
    animation: isSelected ? 'pulse 1.5s infinite' : undefined,
    touchAction: 'manipulation',
    '@keyframes pulse': {
        '0%': {
            boxShadow: '0 0 25px rgba(255, 193, 7, 1), 0 0 50px rgba(255, 193, 7, 0.5)',
        },
        '50%': {
            boxShadow: '0 0 35px rgba(255, 193, 7, 1), 0 0 70px rgba(255, 193, 7, 0.7)',
        },
        '100%': {
            boxShadow: '0 0 25px rgba(255, 193, 7, 1), 0 0 50px rgba(255, 193, 7, 0.5)',
        },
    },
    '&:hover': {
        transform: isFlipped ? 'rotateY(180deg) scale(1.05)' : 'rotateY(0deg) scale(1.05)',
    },
    '&:active': {
        transform: isFlipped ? 'rotateY(180deg) scale(0.95)' : 'rotateY(0deg) scale(0.95)',
    },
    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
    },
    [theme.breakpoints.down('sm')]: {
        width: 'clamp(50px, 18vw, 80px)',
        height: 'clamp(50px, 18vw, 80px)',
        minWidth: 50,
        minHeight: 50,
    },
}));

const CardFace = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
}));

const FrontFace = styled(CardFace)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    background: isSelected
        ? `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`
        : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: isSelected ? theme.palette.warning.contrastText : theme.palette.primary.contrastText,
    border: isSelected
        ? `3px solid ${theme.palette.warning.dark}`
        : `2px solid ${theme.palette.primary.dark}`,
}));

const BackFace = styled(CardFace)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
    color: theme.palette.secondary.contrastText,
    transform: 'rotateY(180deg)',
    border: `2px solid ${theme.palette.secondary.dark}`,
}));

const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick, disabled = false, isSelected = false }) => {
    // Get the MUI icon component dynamically
    const IconComponent = (Icons as any)[card.value] || Icons.Help;

    return (
        <StyledCard
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            isSelected={isSelected}
            onClick={disabled ? undefined : onClick}
            elevation={card.isFlipped ? 8 : 2}
            sx={{
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
            }}
        >
            <CardContent sx={{ p: 0, height: '100%', position: 'relative' }}>
                <FrontFace isSelected={isSelected}>
                    {isSelected ? (
                        <IconComponent
                            sx={{
                                fontSize: 'clamp(24px, 8vw, 48px)',
                                color: 'inherit',
                                display: 'block'
                            }}
                        />
                    ) : (
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 'clamp(20px, 6vw, 32px)'
                            }}
                        >
                            ?
                        </Typography>
                    )}
                </FrontFace>
                <BackFace>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: 'clamp(20px, 6vw, 32px)'
                        }}
                    >
                        ?
                    </Typography>
                </BackFace>
            </CardContent>
        </StyledCard>
    );
};

export default MemoryCard;
